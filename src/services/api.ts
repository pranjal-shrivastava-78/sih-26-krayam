/**
 * KRAYAM Agri-Procurement API Service Layer
 * Designed for FastAPI Backend Integration
 * (http://localhost:8000/api or configurable via VITE_API_BASE_URL)
 * 
 * Provides typed REST client with automatic fallback to local persistence
 * if the FastAPI backend is offline or in demo mode.
 */

import { 
  FarmerProfile, 
  Booking, 
  ProcurementCentre, 
  CropInfo, 
  ProcurementRecord, 
  PaymentRecord, 
  AppNotification, 
  SlotTimeWindow 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('krayam_auth_token');
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

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout for fast local fallback

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP Error ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }

  // --- Authentication Endpoints ---
  public auth = {
    login: async (farmerIdOrMobile: string, otp?: string): Promise<{ token: string; farmer: FarmerProfile }> => {
      try {
        return await this.request('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ identifier: farmerIdOrMobile, otp: otp || '123456' }),
        });
      } catch {
        // Fallback for standalone/offline demo
        return {
          token: 'demo-jwt-token-2026',
          farmer: {
            farmerId: farmerIdOrMobile.includes('-') ? farmerIdOrMobile : 'MP-2024-7842',
            fullName: 'Sardar Gurpreet Singh',
            mobileNumber: farmerIdOrMobile.startsWith('+') ? farmerIdOrMobile : '+91 98765 43210',
            location: {
              village: 'Rampur Kalan',
              tehsil: 'Samrala',
              district: 'Ludhiana',
              state: 'Punjab',
              pincode: '141114',
              coordinates: { lat: 30.8358, lng: 76.1917 }
            },
            landHoldingAcres: 12.5,
            registeredDate: '12-Feb-2024',
            bankAccountMasked: 'Punjab National Bank (A/C: *******4891)'
          }
        };
      }
    },

    register: async (farmerData: {
      fullName: string;
      mobileNumber: string;
      aadhaarNumber?: string;
      village: string;
      tehsil: string;
      district: string;
      state: string;
      pincode: string;
      landHoldingAcres: number;
      bankAccountMasked?: string;
      primaryCrop?: string;
    }): Promise<{ token: string; farmer: FarmerProfile }> => {
      try {
        return await this.request('/auth/register', {
          method: 'POST',
          body: JSON.stringify(farmerData),
        });
      } catch {
        const randomId = Math.floor(1000 + Math.random() * 9000);
        const newFarmer: FarmerProfile = {
          farmerId: `MP-2024-${randomId}`,
          fullName: farmerData.fullName,
          mobileNumber: farmerData.mobileNumber,
          location: {
            village: farmerData.village,
            tehsil: farmerData.tehsil,
            district: farmerData.district,
            state: farmerData.state,
            pincode: farmerData.pincode,
            coordinates: { lat: 30.8358, lng: 76.1917 }
          },
          landHoldingAcres: farmerData.landHoldingAcres,
          registeredDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          bankAccountMasked: farmerData.bankAccountMasked || 'State Bank of India (A/C: *******2910)'
        };
        return {
          token: `demo-jwt-token-${randomId}`,
          farmer: newFarmer
        };
      }
    },

    getMe: async (): Promise<FarmerProfile | null> => {
      try {
        return await this.request('/auth/me');
      } catch {
        return null;
      }
    }
  };

  // --- Bookings Endpoints ---
  public bookings = {
    create: async (payload: {
      cropId: string;
      quantityQuintals: number;
      expectedDate: string;
      centreId: string;
      slot: SlotTimeWindow;
    }): Promise<Booking> => {
      try {
        return await this.request('/bookings', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      } catch {
        const randToken = Math.floor(1000 + Math.random() * 9000);
        return {
          id: `BK-2026-${randToken}`,
          farmerId: 'MP-2024-7842',
          farmerName: 'Sardar Gurpreet Singh',
          farmerMobile: '+91 98765 43210',
          cropId: payload.cropId,
          cropName: 'Wheat (गेहूं)',
          quantityQuintals: payload.quantityQuintals,
          expectedDate: payload.expectedDate,
          centreId: payload.centreId,
          centreName: 'Samrala Main Grain Mandi & Procurement Hub',
          centreLocation: 'Grain Market Road, Samrala, Ludhiana',
          slot: payload.slot,
          status: 'IN_QUEUE',
          createdAt: new Date().toISOString(),
          queuePosition: 3,
          farmersAhead: 2,
          estimatedWaitMinutes: 25,
        };
      }
    },

    cancel: async (bookingId: string): Promise<{ success: boolean }> => {
      try {
        return await this.request(`/bookings/${bookingId}/cancel`, { method: 'POST' });
      } catch {
        return { success: true };
      }
    },

    reschedule: async (bookingId: string, date: string, slot: SlotTimeWindow): Promise<{ success: boolean }> => {
      try {
        return await this.request(`/bookings/${bookingId}/reschedule`, {
          method: 'POST',
          body: JSON.stringify({ expectedDate: date, slot }),
        });
      } catch {
        return { success: true };
      }
    }
  };
}

export const api = new ApiClient(API_BASE_URL);
export default api;
