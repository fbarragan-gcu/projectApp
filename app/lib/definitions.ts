// Database TS Types

// Administrator Type
export type Admin = {
    admin_id: string;
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    password: string;
}

// Customer Type
export type Customer = {
    customer_id: string;
    admin_id: string,
    first_name: string;
    last_name: string;
    address_one: string;
    address_two: string | null;
    city: string;
    state: string;
    zip_code: string;
    email_address: string;
    phone_number: string;
}

// Update State to use a string union state: 'ca' | 'az'
// TODO: Add all states
// Project Type
export type Project = {
    project_id: string;
    customer_id: string;
    address_one: string;
    address_two: string | null;
    city: string;
    state: string;
    zip_code: string;
    scope_of_work: string;
    special_request: string;
    quoted_price: string;
    image_id: string;
    created_at: string;
    modified_at: string;
}

// Project and Customer info combined
export type ProjectFull = {
    project_id: string;
    admin_id: string;
    customer_id: string;
    first_name: string;
    last_name: string;
    address_one: string;
    address_two: string | null;
    city: string;
    state: string;
    zip_code: string;
    scope_of_work: string;
    special_request: string;
    quoted_price: string;
    image_id:string | null;
    created_at:string;
    modified_at: string;
    email_address: string;
    phone_number: string;
}

// Project Image Type
export type Project_images = {
    image_id: string;
    project_id: string;
    image_url: string;
}