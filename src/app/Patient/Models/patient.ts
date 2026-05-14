export interface Patient {
    
    name: string;
    age: number;
    gender: string;
    contactNumber: string;
}

export interface ReadPatient {
    patientId: number;
    name: string;
    age: number;
    gender: string;
    contactNumber: string;
}

export interface UpdatePatient {
    age: number;
    contactNumber: string;
}