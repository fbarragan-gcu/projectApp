// Database TS Types

export type Admin = {
    admin_id: string;
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    password: string;
}

export type Customer = {
    customer_id: string;
    first_name: string;
    last_name: string;
    street_name: string;
    state: string;
    zip_code: string;
    email_address: string;
    phone_number: string;
}

// Update State to use a string union state: 'ca' | 'az'
// TODO: Add all states
export type Project = {
    project_id: string;
    customer_id: string;
    street_name: string;
    city: string;
    state: string;
    zip_code: string;
    scope_of_work: string;
    special_request: string;
    quoted_price: string;
}

export type Project_images = {
    image_id: string;
    project_id: string;
    image_url: string;
}