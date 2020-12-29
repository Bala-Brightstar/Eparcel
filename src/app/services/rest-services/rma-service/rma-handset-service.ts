
export interface GetManuFacturer {
    manufacturerId?: number;
    manufacturerCode: number;
    manufacturerDescription: string;
    models: Model[];
}

export interface Model {
    modelId?: number;
    modelCode: number;
    modelDescription: string;
    memorySizes: MemorySize[];
}

export interface MemorySize {
    memorySizeId?: number;
    memorySizeCode: string;
    memorySizeDescription: string;
    colors: DeviceColor[];
}

export interface DeviceColor {
    colorId?: number;
    colorCode: string;
    colorDescription: string;
    carriers: Carrier[];
}

export interface Carrier {
    carrierId?: number;
    carrierCode: string;
    carrierDescription: string;
    partNumber: string;
    description: string;
}

export interface GetAllManufacturers {
    manufacturerId?: number;
    manufacturerCode: string;
    manufacturerDescription: string;
}
