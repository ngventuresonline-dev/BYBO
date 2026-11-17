export type TripStatus =
  | "searching" | "accepted" | "arrived" | "ongoing"
  | "completed" | "cancelled_rider" | "cancelled_captain" | "no_captain";

export type VehicleClass = {
  id: string; label: string; seats: number; base_fare: number; base_km: number;
  per_km: number; per_min: number; min_fare: number; platform_fee: number;
  gst_pct: number; commission_pct: number; sort_order: number; eta_bias_min: number;
};

export type Captain = {
  id: string; name: string; phone: string; city_id: string;
  vehicle_class_id: string; vehicle_number: string | null; vehicle_model: string | null;
  kyc_status: "pending_kyc" | "rejected" | "approved" | "suspended";
  duty: "offline" | "online" | "on_trip";
  lat: number | null; lng: number | null; heading: number | null;
  rating: number; trips_count: number; wallet_balance: number; is_ev: boolean;
  dl_number: string | null; rc_number: string | null; aadhaar_last4: string | null; pan_number: string | null;
};

export type Trip = {
  id: string; code: string; rider_id: string; captain_id: string | null;
  city_id: string; vehicle_class_id: string; status: TripStatus;
  pickup_label: string; pickup_lat: number; pickup_lng: number;
  drop_label: string; drop_lat: number; drop_lng: number;
  distance_km: number; duration_min: number; surge: number;
  fare_estimate: number; fare_final: number | null;
  commission: number | null; captain_earning: number | null;
  pay_mode: "cash" | "upi" | "wallet" | "card"; paid: boolean;
  start_otp: string; rider_rating: number | null; cancel_reason: string | null;
  requested_at: string; accepted_at: string | null; started_at: string | null; ended_at: string | null;
};

export type RideOffer = {
  id: string; trip_id: string; captain_id: string;
  state: "pending" | "accepted" | "declined" | "expired" | "superseded";
  distance_to_pickup_km: number; wave: number; expires_at: string;
};

export type Place = {
  id: string; label: string; sub_label: string | null;
  lat: number; lng: number; popular: boolean;
};

export type TripEvent = {
  id: number; trip_id: string; kind: string; actor: string;
  detail: Record<string, unknown>; at: string;
};
