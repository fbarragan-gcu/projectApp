import { sql } from '@vercel/postgres';
import { Customer,CustomerID, Project, Admin } from './definitions';

// Customer
export async function fetchAllCustomers() {
    try {
        const result = await sql<Customer>`
        SELECT customer_id, first_name, last_name, street_name, state, zip_code, email_address, phone_number
        FROM customer
        `;
        const customers = result.rows;
        return customers;
    } catch (err) {
        console.log("Database Error: ", err);
        throw new Error("Failed to fetch customer data");
    }
}

export async function getCustomerById(id:string): Promise<Customer | null> {
    try {
        const result = await sql<Customer> `
        SELECT customer_id, first_name, last_name, street_name, state, zip_code, email_address, phone_number
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

// Project
export async function fetchAllProjects() {
    try {
        const result = await sql<Project>`
        SELECT project_id, customer_id, street_name, city, state, zip_code, scope_of_work, special_request,
        quoted_price, created_at
        FROM project
        `;
        const projects = result.rows;
        return projects;
    } catch (err) {
        console.log("Database Error: ", err);
        throw new Error("Failed to fetch project data");
    }
}

export async function getProjectsByCustomerId(id:string): Promise<Project[] | null> {
    try{
        const result = await sql<Project>`
        SELECT project_id, customer_id, street_name, city, state, zip_code, scope_of_work, special_request,
        quoted_price, created_at
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

// Admin
export async function fetchAllAdmins() {
    try {
        const result = await sql<Admin>`
        SELECT admin_id, user_name, first_name, last_name, email
        FROM admin
        `;
        const projects = result.rows;
        return projects;
    } catch (err) {
        console.log("Database Error: ", err);
        throw new Error("Failed to fetch admin data");
    }
}