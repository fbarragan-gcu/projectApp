import { sql } from '@vercel/postgres';
import { Customer, Project, Admin } from './definitions';

/* Customer */

// Get All Customers, Sort by customer_id
export async function getAllCustomers(): Promise<Customer[]> {
    try {
        const result = await sql<Customer>`
        SELECT customer_id, admin_id, first_name, last_name, address_one, address_two, state, zip_code, email_address, phone_number
        FROM customer
        ORDER BY customer_id
        `;
        const customers = result.rows;
        return customers;
    } catch (err) {
        console.log("Database Error: ", err);
        throw new Error("Failed to fetch customer data");
    }
}

// Get Customer by customer_id
export async function getCustomerById(id:string): Promise<Customer | null> {
    try {
        const result = await sql<Customer> `
        SELECT customer_id, admin_id, first_name, last_name, address_one, address_two, state, zip_code, email_address, phone_number
        FROM customer
        WHERE customer_id = ${id};
        `
        const customer = result.rows[0];
        return customer || null;
    } catch (err) {
        console.log("Database Error: ", err)
        throw new Error("Failed to fetch Customer by ID");
    }
}

// Create New Customer
export async function createCustomer(customer: Customer): Promise<Customer[]>{
    try{
        const result = await sql<Customer>`
        INSERT INTO customer(admin_id, first_name, last_name, address_one, address_two, city, state, zip_code, email_address, phone_number)
            VALUES (
                ${customer.admin_id},
                ${customer.first_name},
                ${customer.last_name},
                ${customer.address_one},
                ${customer.address_two || null},
                ${customer.city},
                ${customer.state},
                ${customer.zip_code},
                ${customer.email_address},
                ${customer.phone_number}
            ) RETURNING *;
        `
        return result.rows;
    } catch (err) {
        console.log('Database Error: ', err);
        throw new Error("Failed to create new Customer record.");
    }
}

/* Project */
export async function getAllProjects(): Promise<Project[]> {
    try {
        const result = await sql<Project>`
        SELECT project_id, customer_id, address_one, address_two, city, state, zip_code, scope_of_work, special_request,
        quoted_price, image_id, created_at, modified_at
        FROM project
        `;
        const projects = result.rows;
        return projects;
    } catch (err) {
        console.log("Database Error: ", err);
        throw new Error("Failed to fetch project data");
    }
}

export async function getProjectById(id:string): Promise<Project | null> {
    try {
        const result = await sql<Project>`
        SELECT project_id, customer_id, address_one, address_two, city, state, zip_code, scope_of_work, special_request,
        quoted_price, image_id, created_at, modified_at
        FROM project
        WHERE project_id = ${id}
        `;
        const projects = result.rows[0];
        return projects || null;
    } catch (err) {
        console.log("Database Error: ", err);
        throw new Error("Failed to fetch project data");
    }
}

export async function getProjectsByCustomerId(id:string): Promise<Project[] | null> {
    try{
        const result = await sql<Project>`
        SELECT project_id, customer_id, address_one, address_two, city, state, zip_code, scope_of_work, special_request,
        quoted_price, image_id, created_at, modified_at
        FROM project
        WHERE customer_id = ${id};
        `
        const projects = result.rows;
        return projects || null;
    } catch (err) {
        console.log("Database Error: ", err);
        throw new Error("Failed to fetch Projects by Customer id" + id);
    }
}

// Get All Projects by Admin Id
export async function getProjectsByAdminId(id:string): Promise<Project[] | null> {
    try{
        const result = await sql<Project>`
            SELECT 
                project.project_id, 
                project.customer_id, 
                project.address_one, 
                project.address_two, 
                project.city, 
                project.state, 
                project.zip_code, 
                project.scope_of_work, 
                project.special_request, 
                project.quoted_price, 
                project.image_id, 
                project.created_at, 
                project.modified_at
            FROM 
                project
            INNER JOIN 
                customer 
            ON 
                project.customer_id = customer.customer_id
            WHERE 
                customer.admin_id = ${id};
        `
        const projects = result.rows;
        return projects || null;
    } catch (err) {
        console.log("Database Error: ", err);
        throw new Error("Failed to fetch Projects by Admin id");
    }
}

/* Admin */
export async function getAllAdmins(): Promise<Admin[]> {
    try {
        const result = await sql<Admin>`
        SELECT admin_id, first_name, last_name, user_name, email
        FROM admin
        `;
        const admins = result.rows;
        return admins;
    } catch (err) {
        console.log("Database Error: ", err);
        throw new Error("Failed to fetch admin data");
    }
}

export async function getAdminById(id:string): Promise<Admin | null> {
    try {
        const result = await sql<Admin>`
        SELECT admin_id, first_name, last_name, user_name, email, password
        FROM admin
        WHERE admin_id = ${id}
        `;
        const admin = result.rows[0];
        return admin;
    } catch (err) {
        console.log("Database Error: ", err);
        throw new Error("Failed to fetch admin data");
    }
}