import { sql } from '@vercel/postgres';
import { Customer, Project, Admin, AppStats } from './definitions';

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

// Get All Customers, Sort by customer_id
export async function getAllCustomersByAdminId(id:string): Promise<Customer[]> {
    try {
        const result = await sql<Customer>`
        SELECT customer_id, admin_id, first_name, last_name, address_one, address_two, state, zip_code, email_address, phone_number
        FROM customer
        WHERE admin_id = ${id}
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

// Get All Projects
export async function getAllProjects(): Promise<Project[]> {
    try {
        const result = await sql<Project>`
        SELECT project_id, customer_id, address_one, address_two, city, state, zip_code, scope_of_work, special_request,
        quoted_price, image_id, created_at, modified_at
        FROM project
        ORDER BY project_id
        `;
        const projects = result.rows;
        return projects;
    } catch (err) {
        console.log("Database Error: ", err);
        throw new Error("Failed to fetch project data");
    }
}

// Get Single Project By ID
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

// Get All Projects By Single Customer ID
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
// TODO: Convert to Supabase
export async function getAllProjectsByAdminId(id:string): Promise<Project[] | null> {
    try{
        const result = await sql<Project>`
        SELECT c.customer_id, c.admin_id, c.first_name, c.last_name, p.project_id, p.city, p.scope_of_work
        FROM customer c
        JOIN project p on c.customer_id = p.customer_id
        WHERE c.admin_id = ${id};
        `
        const projects = result.rows;
        return projects || null;
    } catch (err) {
        console.log("Database Error: ", err);
        throw new Error("Failed to fetch Projects by Admin id");
    }
}

// Create New Project
export async function createProject(project: Project): Promise<Project[]>{
    try{
        const result = await sql<Project>`
        INSERT INTO project(customer_id, address_one, address_two, city, state, zip_code, scope_of_work, special_request, quoted_price, image_id)
            VALUES (
                ${project.customer_id},
                ${project.address_one},
                ${project.address_two || null},
                ${project.city},
                ${project.state},
                ${project.zip_code},
                ${project.scope_of_work},
                ${project.special_request},
                ${project.quoted_price},
                ${project.image_id}
            ) RETURNING *;
        `
        return result.rows;
    } catch (err) {
        console.log('Database Error: ', err);
        throw new Error("Failed to create new Project record.");
    }
}

// Edit Project By Project ID
export async function updateProject(project: Project): Promise<Project> {
    try {
        const result = await sql<Project>`
            UPDATE project
            SET
                customer_id = ${project.customer_id},
                address_one = ${project.address_one},
                address_two = ${project.address_two || null},
                city = ${project.city},
                state = ${project.state},
                zip_code = ${project.zip_code},
                scope_of_work = ${project.scope_of_work},
                special_request = ${project.special_request},
                quoted_price = ${project.quoted_price},
                image_id = ${project.image_id},
                modified_at = CURRENT_TIMESTAMP
            WHERE project_id = ${project.project_id}
            RETURNING *;
        `;
        return result.rows[0];
    } catch (err) {
        console.log('Database Error: ', err);
        throw new Error("Failed to update Project record.");
    }
}

// Delete Project By ID
export async function deleteProject(projectId: string): Promise<Project | null> {
    try {
        const result = await sql<Project>`
            DELETE FROM project
            WHERE project_id = ${projectId}
            RETURNING *
        `
        const deletedProject = result.rows[0];
        // Return Number or Null if not found
        return deletedProject || null;
    } catch(err) {
        console.log('Database Error: ', err);
        throw new Error("Failed to delete Project record.")
    }
}

/* Admin */
// TODO: Convert to Supabase

// Get All Admins
// export async function getAllAdmins(): Promise<Admin[]> {
//     try {
//         const result = await sql<Admin>`
//         SELECT admin_id, first_name, last_name, user_name, email
//         FROM admin
//         `;
//         const admins = result.rows;
//         return admins;
//     } catch (err) {
//         console.log("Database Error: ", err);
//         throw new Error("Failed to fetch admin data");
//     }
// }

// // Get Admin By ID
// export async function getAdminById(id:string): Promise<Admin | null> {
//     try {
//         const result = await sql<Admin>`
//         SELECT admin_id, first_name, last_name, user_name, email, password
//         FROM admin
//         WHERE admin_id = ${id}
//         `;
//         const admin = result.rows[0];
//         return admin;
//     } catch (err) {
//         console.log("Database Error: ", err);
//         throw new Error("Failed to fetch admin data");
//     }
// }

export async function getAppStats(): Promise<AppStats> {
    try {
        const results = await sql<AppStats>`
            SELECT
                COUNT(DISTINCT c.customer_id) AS number_of_customers,
                COUNT(p.project_id) AS number_of_projects,
                COALESCE(SUM(p.quoted_price), 0) AS project_total
            FROM customer c
            LEFT JOIN project p ON c.customer_id = p.customer_id;
        `
        const stats = results.rows[0];
        return stats;
    } catch (err) {
        console.log("Database Error: ", err);
        throw new Error("Failed to fetch Application Stats");
    }
}