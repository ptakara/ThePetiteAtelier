export interface Customer {
  id: string
  first_name: string
  last_name: string
  email: string
  cellphone: string | null
  age: number | null
  
  // Physical measurements (in centimeters unless specified)
  height_cm: number | null
  weight_kg: number | null
  bust_cm: number | null
  waist_cm: number | null
  hips_cm: number | null
  shoulder_width_cm: number | null
  arm_length_cm: number | null
  inseam_cm: number | null
  
  // Address
  street_address: string | null
  city: string | null
  state: string | null
  postal_code: string | null
  country: string | null
  
  // Metadata
  notes: string | null
  created_at: string
  updated_at: string
}

export interface CustomerInsert {
  first_name: string
  last_name: string
  email: string
  cellphone?: string | null
  age?: number | null
  height_cm?: number | null
  weight_kg?: number | null
  bust_cm?: number | null
  waist_cm?: number | null
  hips_cm?: number | null
  shoulder_width_cm?: number | null
  arm_length_cm?: number | null
  inseam_cm?: number | null
  street_address?: string | null
  city?: string | null
  state?: string | null
  postal_code?: string | null
  country?: string | null
  notes?: string | null
}

export interface CustomerUpdate extends Partial<CustomerInsert> {}
