
export interface TablePaging {
    count: number;
    offset: number;
    pageSize: number;
    limit: number;
}

export interface TableIconCell {
    source: string;
    color: string;
    action: (data: any) => void;
}

export interface TableHeader  {
    prop: string;
    key?: string;
}


