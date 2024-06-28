import { NextRequest, NextResponse } from 'next/server';
import { createCustomer, getAllCustomers } from '../../lib/data';

// GET Method for All Customers
// api/customer
export async function GET(request: NextRequest) {

  try {
    const customers = await getAllCustomers();
    return NextResponse.json(customers);
  } catch (err) {
    console.error('API Error: ', err);
    return NextResponse.json({ error: 'Failed to fetch customer data' }, { status: 500 });
  }
}

// POST Method for New Customer creation
// api/customer
export async function POST(request: NextRequest) {
  
  try {
    const body = await request.json();
    const newCustomer = await createCustomer(body);
    return NextResponse.json(newCustomer, { status: 201})
  } catch (err) {
    console.log("API Error", err);
    return NextResponse.json({ error: "Failed to create new Customer" }, { status: 500});
  }
}