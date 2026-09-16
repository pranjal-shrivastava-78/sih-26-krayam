/**
 * KRAYAM Agri-Procurement API Client Layer
 * Connected to FastAPI Backend (https://hizru.me)
 * OpenAPI / Swagger spec: https://hizru.me/openapi.json
 */

import {
  FarmerProfile,
  Booking,
  ProcurementCentre,
  CropInfo,
  ProcurementRecord,
  PaymentRecord,
  AppNotification,
  SlotTimeWindow,
  OperatorProfile,
  TimeSlot
} from '../types';

// Normalize Base URL to ensure /api/v1 routing
export function resolveApiBaseUrl(): string {
  const envUrl = (
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    'https://hizru.me/api'
  ).trim();

  // Strip trailing /docs or /docs/
  let clean = envUrl.replace(/\/docs\/?$/, '').replace(/\/+$/, '');

  // If user provided https://hizru.me/api -> https://hizru.me/api/v1
  if (clean.endsWith('/api')) {
    return `${clean}/v1`;
  }
  // If user provided https://hizru.me -> https://hizru.me/api/v1
  if (!clean.endsWith('/api/v1')) {
    return `${clean}/api/v1`;
  }

  return clean;
}

export const API_BASE_URL = resolveApiBaseUrl();

// --- FastAPI Data Contracts (OpenAPI Schemas) ---
export interface BackendHealthResponse {
  status: string;
}

export interface BackendCentreCrop {
  id: string;
  crop_name: string;
  rate_per_unit: number | null;
  min_price_per_unit: number | null;
  max_price_per_unit: number | null;
  unit: string;
  is_active: boolean;
}

export interface BackendCentre {
  id: string;
  name: string;
  code: string;
  address?: string | null;
  village?: string | null;
  district?: string | null;
  state?: string | null;
  latitude: number;
  longitude: number;
  capacity: number;
  operating_start: string;
  operating_end: string;
  is_active: boolean;
  crops: BackendCentreCrop[];
  created_at: string;
}

export interface BackendSlot {
  id: string;
  centre_id: string;
  date: string;
  start_time: string;
  end_time: string;
  max_bookings: number;
  current_bookings: number;
  is_available: boolean;
}

export interface BackendBooking {
  id: string;
  booking_id: string;
  farmer_id: string;
  centre_id?: string | null;
  slot_id?: string | null;
  crop: string;
  quantity: number;
  unit: string;
  expected_date: string;
  is_walk_in: boolean;
  status: 'pending' | 'confirmed' | 'checked_in' | 'processing' | 'completed' | 'cancelled' | 'no_show' | 'rescheduled' | 'expired';
  created_at: string;
  updated_at: string;
}

export interface BackendFarmer {
  id: string;
  phone: string;
  name: string;
  village?: string | null;
  district?: string | null;
  state?: string | null;
  pincode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  farmer_id?: string | null;
  is_verified: boolean;
  created_at: string;
}

export interface BackendQRCodeResponse {
  type: string;
  reference_id: string;
  qr_data: string;
  svg: string;
  data_url: string;
}

export interface BackendQueueEntry {
  id: string;
  booking_id: string;
  centre_id: string;
  position: number;
  status: string;
  checked_in_at?: string | null;
  called_at?: string | null;
}

export interface BackendQueueSummary {
  centre_id: string;
  waiting: BackendQueueEntry[];
  total_waiting: number;
  current_position?: number | null;
  estimated_wait_minutes?: number | null;
}

export interface BackendProcurement {
  id: string;
  procurement_id: string;
  booking_id: string;
  accepted_quantity: number;
  unit_price: number;
  quality_grade?: string | null;
  unit: string;
  quality_notes?: string | null;
  processing_start?: string | null;
  processing_end?: string | null;
  status: string;
  created_at: string;
}

export interface BackendPayment {
  id: string;
  payment_id: string;
  procurement_id: string;
  farmer_id: string;
  quantity: number;
  rate: number;
  amount: number;
  status: 'pending' | 'verified' | 'initiated' | 'credited' | 'failed';
  verified_by?: string | null;
  verified_at?: string | null;
  confirmed_at?: string | null;
  created_at: string;
  anomaly_flags?: string[];
}

export interface BackendOperator {
  id: string;
  name: string;
  phone: string;
  centre_id: string;
  is_active: boolean;
}

export interface BackendNotificationItem {
  id: string;
  farmer_id?: string;
  event_type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

class ApiClient {
  public baseUrl: string;
  private token: string | null = null;
  private operatorToken: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('krayam_auth_token');
    this.operatorToken = localStorage.getItem('krayam_operator_token');
  }

  public setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('krayam_auth_token', token);
    } else {
      localStorage.removeItem('krayam_auth_token');
    }
  }

  public getToken(): string | null {
    return this.token;
  }

  public setOperatorToken(token: string | null) {
    this.operatorToken = token;
    if (token) {
      localStorage.setItem('krayam_operator_token', token);
    } else {
      localStorage.removeItem('krayam_operator_token');
    }
  }

  public getOperatorToken(): string | null {
    return this.operatorToken;
  }

  public async request<T>(endpoint: string, options: RequestInit = {}, useOperatorToken = false): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseUrl}${cleanEndpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    const authToken = useOperatorToken
      ? (this.operatorToken || this.token)
      : (this.token || this.operatorToken);

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s request timeout

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        let message = '';
        if (typeof errorData.detail === 'string') {
          message = errorData.detail;
        } else if (Array.isArray(errorData.detail) && errorData.detail.length > 0) {
          message = errorData.detail.map((d: any) => d.msg || JSON.stringify(d)).join(', ');
        } else if (errorData.error?.message) {
          message = errorData.error.message;
        } else if (errorData.message) {
          message = errorData.message;
        } else {
          message = `HTTP Error ${response.status}: ${response.statusText}`;
        }
        throw new Error(message);
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error('Request timed out while connecting to the backend.');
      }
      throw err;
    }
  }

  // --- Health Check ---
  public async healthCheck(): Promise<{ ok: boolean; status: string }> {
    const data = await this.request<BackendHealthResponse>('/health', { method: 'GET' });
    return { ok: data.status === 'ok', status: data.status };
  }

  // --- Authentication Endpoints ---
  public auth = {
    sendOtp: async (phone: string): Promise<{ success: boolean; message: string }> => {
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      const data = await this.request<{ message: string }>('/auth/otp/send', {
        method: 'POST',
        body: JSON.stringify({ phone: cleanPhone }),
      });
      return { success: true, message: data.message || 'OTP sent successfully' };
    },

    verifyOtp: async (phone: string, code: string): Promise<{
      token: string;
      farmerId: string | null;
      isRegistered: boolean;
      farmerProfile?: FarmerProfile;
    }> => {
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      const data = await this.request<{
        access_token: string;
        token_type: string;
        farmer_id: string | null;
        is_registered: boolean;
      }>('/auth/otp/verify', {
        method: 'POST',
        body: JSON.stringify({ phone: cleanPhone, code: code.trim() }),
      });

      this.setToken(data.access_token);

      let farmerProfile: FarmerProfile | undefined;
      if (data.is_registered) {
        try {
          const profile = await this.auth.getMe();
          if (profile) farmerProfile = profile;
        } catch {
          // If fetching profile fails immediately, it can be retried on dashboard mount
        }
      }

      return {
        token: data.access_token,
        farmerId: data.farmer_id,
        isRegistered: data.is_registered,
        farmerProfile,
      };
    },

    register: async (farmerData: {
      name: string;
      village?: string;
      district?: string;
      state?: string;
      pincode?: string;
      latitude?: number;
      longitude?: number;
    }): Promise<FarmerProfile> => {
      const backendFarmer = await this.request<BackendFarmer>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(farmerData),
      });
      return this.transformFarmer(backendFarmer);
    },

    getMe: async (): Promise<FarmerProfile | null> => {
      try {
        const backendFarmer = await this.request<BackendFarmer>('/farmers/me', { method: 'GET' });
        return this.transformFarmer(backendFarmer);
      } catch (err: any) {
        if (err.message && err.message.includes('401')) {
          this.setToken(null);
        }
        throw err;
      }
    },

    updateMe: async (data: {
      name?: string;
      village?: string;
      district?: string;
      state?: string;
      pincode?: string;
      latitude?: number;
      longitude?: number;
    }): Promise<FarmerProfile> => {
      const updated = await this.request<BackendFarmer>('/farmers/me', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return this.transformFarmer(updated);
    },

    operatorLogin: async (phone: string, password: string): Promise<{
      token: string;
      operator: OperatorProfile;
    }> => {
      const data = await this.request<{
        access_token: string;
        token_type: string;
        operator: BackendOperator;
      }>('/operator/login', {
        method: 'POST',
        body: JSON.stringify({ phone: phone.trim(), password }),
      });

      this.setOperatorToken(data.access_token);

      const opProfile: OperatorProfile = {
        operatorId: data.operator.id,
        name: data.operator.name,
        designation: 'Mandi Procurement Supervisor',
        centreId: data.operator.centre_id,
        centreName: 'APMC Mandi Centre',
        mobile: data.operator.phone,
        shift: 'Day Shift (08:00 AM - 06:00 PM)',
      };

      return {
        token: data.access_token,
        operator: opProfile,
      };
    },
  };

  // --- Centres & Slots Endpoints ---
  public centres = {
    getAll: async (crop?: string): Promise<ProcurementCentre[]> => {
      const endpoint = crop ? `/centres?crop=${encodeURIComponent(crop)}` : '/centres';
      const backendCentres = await this.request<BackendCentre[]>(endpoint, { method: 'GET' });
      return backendCentres.map((c) => this.transformCentre(c));
    },

    getById: async (centreId: string): Promise<ProcurementCentre> => {
      const backendCentre = await this.request<BackendCentre>(`/centres/${centreId}`, { method: 'GET' });
      return this.transformCentre(backendCentre);
    },

    getSlots: async (centreId: string, onDate?: string): Promise<BackendSlot[]> => {
      const url = `/slots?centre_id=${encodeURIComponent(centreId)}${
        onDate ? `&on_date=${encodeURIComponent(onDate)}` : ''
      }`;
      return await this.request<BackendSlot[]>(url, { method: 'GET' });
    },
  };

  // --- Bookings Endpoints ---
  public bookings = {
    getMyBookings: async (): Promise<Booking[]> => {
      const data = await this.request<BackendBooking[]>('/bookings', { method: 'GET' });
      return data.map((b) => this.transformBooking(b));
    },

    getById: async (bookingId: string): Promise<Booking> => {
      const b = await this.request<BackendBooking>(`/bookings/${bookingId}`, { method: 'GET' });
      return this.transformBooking(b);
    },

    create: async (payload: {
      crop: string;
      quantity: number;
      unit?: string;
      expectedDate: string;
      centreId?: string | null;
      slotId?: string | null;
      slotWindow?: SlotTimeWindow;
    }): Promise<Booking> => {
      const backendBooking = await this.request<BackendBooking>('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          crop: payload.crop,
          quantity: payload.quantity,
          unit: payload.unit || 'quintal',
          expected_date: payload.expectedDate,
          centre_id: payload.centreId || null,
          slot_id: payload.slotId || null,
        }),
      });

      return this.transformBooking(backendBooking, undefined, payload.slotWindow);
    },

    cancel: async (bookingId: string): Promise<Booking> => {
      const b = await this.request<BackendBooking>(`/bookings/${bookingId}/cancel`, { method: 'POST' });
      return this.transformBooking(b);
    },

    reschedule: async (bookingId: string, data: {
      expectedDate?: string;
      centreId?: string | null;
      slotId?: string | null;
      slotWindow?: SlotTimeWindow;
    }): Promise<Booking> => {
      const b = await this.request<BackendBooking>(`/bookings/${bookingId}/reschedule`, {
        method: 'POST',
        body: JSON.stringify({
          expected_date: data.expectedDate,
          centre_id: data.centreId || null,
          slot_id: data.slotId || null,
        }),
      });
      return this.transformBooking(b, undefined, data.slotWindow);
    },

    getQr: async (bookingId: string): Promise<BackendQRCodeResponse> => {
      return await this.request<BackendQRCodeResponse>(`/bookings/${bookingId}/qr`, { method: 'GET' });
    },

    recommend: async (crop: string, expectedDate: string): Promise<any[]> => {
      return await this.request<any[]>(
        `/bookings/recommend?crop=${encodeURIComponent(crop)}&expected_date=${encodeURIComponent(expectedDate)}`,
        { method: 'POST' }
      );
    },
  };

  // --- Queue Operations ---
  public queue = {
    getSummary: async (centreId: string): Promise<BackendQueueSummary> => {
      return await this.request<BackendQueueSummary>(`/operator/queue/${centreId}`, { method: 'GET' }, true);
    },

    checkIn: async (bookingId: string): Promise<BackendQueueEntry> => {
      return await this.request<BackendQueueEntry>('/operator/check-in', {
        method: 'POST',
        body: JSON.stringify({ booking_id: bookingId }),
      }, true);
    },

    callNext: async (): Promise<BackendQueueEntry | null> => {
      return await this.request<BackendQueueEntry | null>('/operator/call-next', { method: 'POST' }, true);
    },

    startProcessing: async (queueEntryId: string): Promise<BackendQueueEntry> => {
      return await this.request<BackendQueueEntry>(`/operator/queue/${queueEntryId}/start`, { method: 'POST' }, true);
    },

    completeProcessing: async (queueEntryId: string): Promise<BackendQueueEntry> => {
      return await this.request<BackendQueueEntry>(`/operator/queue/${queueEntryId}/complete`, { method: 'POST' }, true);
    },

    markNoShow: async (queueEntryId: string): Promise<BackendQueueEntry> => {
      return await this.request<BackendQueueEntry>(`/operator/queue/${queueEntryId}/no-show`, { method: 'POST' }, true);
    },
  };

  // --- Procurements Endpoints ---
  public procurements = {
    record: async (payload: {
      booking_id: string;
      accepted_quantity: number;
      unit_price: number;
      quality_grade?: string;
      unit?: string;
      quality_notes?: string;
    }): Promise<BackendProcurement> => {
      return await this.request<BackendProcurement>('/operator/procurements', {
        method: 'POST',
        body: JSON.stringify({
          booking_id: payload.booking_id,
          accepted_quantity: payload.accepted_quantity,
          unit_price: payload.unit_price,
          quality_grade: payload.quality_grade,
          unit: payload.unit || 'quintal',
          quality_notes: payload.quality_notes,
        }),
      }, true);
    },

    getQr: async (id: string): Promise<BackendQRCodeResponse> => {
      return await this.request<BackendQRCodeResponse>(`/operator/procurements/${id}/qr`, { method: 'GET' }, true);
    },

    initiatePayment: async (procurementId: string): Promise<BackendPayment> => {
      return await this.request<BackendPayment>(`/operator/procurements/${procurementId}/payment`, {
        method: 'POST',
      }, true);
    },
  };

  // --- Payments Endpoints ---
  public payments = {
    getAll: async (params: { status?: string; limit?: number; offset?: number } = {}): Promise<{
      items: any[];
      total: number;
      limit: number;
      offset: number;
    }> => {
      const q = new URLSearchParams(params as any).toString();
      return await this.request(`/operator/payments?${q}`, { method: 'GET' }, true);
    },

    verify: async (paymentId: string, confirmed: boolean, verifiedBy = 'Operator'): Promise<BackendPayment> => {
      return await this.request<BackendPayment>(`/operator/payments/${paymentId}/verify`, {
        method: 'POST',
        body: JSON.stringify({ confirmed, verified_by: verifiedBy }),
      }, true);
    },
  };

  // --- Notifications Endpoints ---
  public notifications = {
    getAll: async (params: { is_read?: boolean; limit?: number; offset?: number } = {}): Promise<AppNotification[]> => {
      const q = new URLSearchParams();
      if (params.is_read !== undefined) q.append('is_read', String(params.is_read));
      if (params.limit) q.append('limit', String(params.limit));
      if (params.offset) q.append('offset', String(params.offset));

      const queryStr = q.toString() ? `?${q.toString()}` : '';
      const res = await this.request<{ items: BackendNotificationItem[]; total: number; unread_count: number }>(
        `/farmers/me/notifications${queryStr}`,
        { method: 'GET' }
      );

      return (res.items || []).map((item) => ({
        id: item.id,
        type: item.event_type === 'PAYMENT' ? 'PAYMENT' : item.event_type === 'QUEUE' ? 'QUEUE' : 'BOOKING',
        title: item.title,
        message: item.message,
        timestamp: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: item.is_read,
      }));
    },

    markRead: async (notificationId: string): Promise<void> => {
      await this.request(`/farmers/me/notifications/${notificationId}/read`, { method: 'PATCH' });
    },

    markAllRead: async (): Promise<void> => {
      await this.request('/farmers/me/notifications/read-all', { method: 'POST' });
    },
  };

  // --- Operator Dashboard & Analytics ---
  public operator = {
    getDashboard: async (): Promise<any> => {
      return await this.request('/operator/dashboard', { method: 'GET' }, true);
    },

    getBookings: async (params: any = {}): Promise<any> => {
      const q = new URLSearchParams(params).toString();
      return await this.request(`/operator/bookings?${q}`, { method: 'GET' }, true);
    },

    getAnalytics: async (from?: string, to?: string): Promise<any> => {
      const q = new URLSearchParams({ ...(from ? { from } : {}), ...(to ? { to } : {}) }).toString();
      return await this.request(`/operator/analytics?${q}`, { method: 'GET' }, true);
    },
  };

  // --- Transformers (Backend Schema -> Frontend UI Models) ---
  public transformCentre(c: BackendCentre): ProcurementCentre {
    const acceptedCropIds = (c.crops || []).map((crop) => crop.crop_name);

    return {
      id: c.id,
      name: c.name,
      officerInCharge: `Mandi Secretary (${c.code})`,
      contactNumber: '+91 1800-180-1551',
      location: {
        address: c.address || `${c.village || ''}, ${c.district || ''}, ${c.state || ''}`.trim(),
        village: c.village || c.name,
        district: c.district || 'District Mandi',
        state: c.state || 'India',
        coordinates: { lat: c.latitude, lng: c.longitude },
      },
      distanceKm: 8.5,
      acceptedCropIds: acceptedCropIds.length > 0 ? acceptedCropIds : ['Wheat', 'Paddy', 'Soybean', 'Mustard', 'Onion'],
      operatingHours: {
        opens: (c.operating_start || '08:00:00').slice(0, 5),
        closes: (c.operating_end || '18:00:00').slice(0, 5),
        lunchBreak: '01:00 PM - 02:00 PM',
        days: 'Mon - Sat',
      },
      currentQueue: {
        activeVehicles: Math.max(1, Math.min(15, Math.round(c.capacity * 0.08))),
        loadLevel: c.capacity > 250 ? 'Low' : 'Moderate',
        estimatedWaitMins: Math.max(10, Math.min(45, Math.round(c.capacity * 0.1))),
      },
      availableSlots: c.capacity || 50,
    };
  }

  public transformFarmer(f: BackendFarmer): FarmerProfile {
    return {
      farmerId: f.farmer_id || `FID-${f.id.slice(0, 8).toUpperCase()}`,
      fullName: f.name,
      mobileNumber: f.phone,
      location: {
        village: f.village || 'Rampur',
        tehsil: 'Samrala Tehsil',
        district: f.district || 'Ludhiana',
        state: f.state || 'Punjab',
        pincode: f.pincode || '141114',
        coordinates: {
          lat: f.latitude || 30.8358,
          lng: f.longitude || 76.1917,
        },
      },
      landHoldingAcres: 8.5,
      registeredDate: new Date(f.created_at).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      bankAccountMasked: 'Bank Account Linked (Aadhaar DBT)',
    };
  }

  public transformBooking(
    b: BackendBooking,
    centreName = 'Procurement Centre',
    slotWindow?: SlotTimeWindow
  ): Booking {
    const statusMap: Record<string, Booking['status']> = {
      pending: 'CONFIRMED',
      confirmed: 'CONFIRMED',
      checked_in: 'CHECKED_IN',
      processing: 'PROCESSING',
      completed: 'COMPLETED',
      cancelled: 'CANCELLED',
      no_show: 'NO_SHOW',
      rescheduled: 'RESCHEDULED',
      expired: 'CANCELLED',
    };

    const status = statusMap[b.status] || 'CONFIRMED';

    return {
      id: b.booking_id || b.id,
      farmerId: b.farmer_id,
      farmerName: 'Farmer',
      farmerMobile: '+91 98765 43210',
      cropId: b.crop.toLowerCase(),
      cropName: b.crop,
      quantityQuintals: b.quantity,
      expectedDate: b.expected_date,
      centreId: b.centre_id || '',
      centreName: centreName,
      centreLocation: 'Grain Mandi Yard',
      slot: slotWindow || 'Morning (08:00 AM - 11:30 AM)',
      status,
      createdAt: b.created_at,
      queuePosition: status === 'CHECKED_IN' ? 2 : undefined,
      farmersAhead: status === 'CHECKED_IN' ? 1 : undefined,
      estimatedWaitMinutes: status === 'CHECKED_IN' ? 15 : undefined,
    };
  }
}

export const api = new ApiClient(API_BASE_URL);
export default api;
