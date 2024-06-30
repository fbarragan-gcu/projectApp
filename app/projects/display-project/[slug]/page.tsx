"use client";
import { Customer, Project } from "@/app/lib/definitions";
import Modal from "@/app/ui/modal/modal1";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HSOverlay } from "preline/preline";
import { useEffect, useState } from "react";

// Display Project by Id
// projects/display-project/:id
export default function DisplayProject({
  params,
}: {
  params: { slug: string };
}) {
  const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
  const [project, setProjects] = useState<Project>();
  const [loading, setLoading] = useState(true);
  // React State VARS for Modal
  const [modalStatus, setModalStatus] = useState({
    title: "",
    status: "",
    css: "",
  });

  // for redirect
  const router = useRouter();
  // Pull Projects by Slug ID
  useEffect(() => {
    if (params.slug) {
      const getProjectAndCustomer = async () => {
        try {
          // Fetch project info first
          const projectRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.slug}`,
            { cache: "no-store" }
          );
          if (!projectRes.ok) {
            throw new Error(`Failed to fetch project by id: ${params.slug}`);
          }
          const project = await projectRes.json();
          setProjects(project);

          // Then fetch customer using project's customer_id
          const customerRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/customers/${project.customer_id}`,
            { cache: "no-store" }
          );
          if (!customerRes.ok) {
            throw new Error(
              `Failed to fetch customer id: ${project.customer_id}`
            );
          }
          const customer = await customerRes.json();
          setCustomerInfo(customer);
          // Set loading to false after both requests complete
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Ensure loading is set to false on error
          setLoading(false);
        }
      };

      getProjectAndCustomer();
    }
  }, [params.slug]);

  // Display project location on Google Maps
  const googleMapsLoc = `https://www.google.com/maps/search/?api=1&query=${project?.address_one}+${project?.city}+${project?.state}`;

  // TODO: Include ProjectId
  // TODO: Possible Double check
  const handleDelete = () => {
    // Handle Delete Modal
    console.log(`ProjectId:${project?.project_id} Deleted.`);
    deleteProject();
  };

  // TODO: Include ProjectId
  const deleteProject = async () => {
    const modalBtn = document.getElementById("modalBtn");
    const projectId = project?.project_id;
    try {
      // Delete Project

      if (!projectId) {
        throw new Error("Project ID is undefined.");
      }

      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete project with ID ${projectId}`);
      }
      // Update Modal for Successful delete
      setModalStatus({
        title: "Success",
        status: "Project Deleted",
        css: "bg-teal-500 hover:bg-teal-600",
      });
      modalBtn?.click();
      console.log("Project Deleted");
    } catch (error) {
      console.error("Error deleting project");
      setModalStatus({
        title: "Error",
        status: "Error Deleting Project",
        css: "bg-red-500 hover:bg-red-600",
      });

      modalBtn?.click();
      console.log("Error Deleting Project");
    }
  };

  // TODO: Fix Delete, Ensure success/fail
  // Handle Modal Click
  const handleButtonClick = () => {
    // Customer Success redirect to All Customers
    if (modalStatus.title === "Success") {
      console.log("OK 200...");
      console.log("Redirecting...");
      router.push("../allprojects");
    } else {
      // Inform of error and prompt back to creation
      console.log("Closing modal...");
      router.push("../allprojects");
      const modalCloseBtn = document.getElementById("closeBtn") as HTMLElement;
      if (modalCloseBtn) {
        modalCloseBtn.click();
        // TODO: Fix
        console.log("Close Btn Clicked!");
      } else {
        console.log("No Modal Button found.");
      }
    }
  };

  // Display loading while pulling data
  if (loading) return <div>Loading...</div>;
  // Display Project not found if error with Project ID
  if (!project)
    return (
      <div>
        Project with ID: {params.slug} not found
        <div className="flex justify-center items-center pt-4">
          <Link href="../allprojects" className="text-center text-blue-500">
            Back to all projects
          </Link>
        </div>
      </div>
    );

  // Return Regular Customer page
  return (
    <>
      <div className="grid grid-cols-3 gap-4 pb-2">
        <div className="text-left">
          <h4>
            Customer:
            <Link
              className="text-blue-500"
              href={`../../customers/displaycustomer/${customerInfo?.customer_id}`}
            >
              {` ${customerInfo?.first_name} ${customerInfo?.last_name}`}
            </Link>
          </h4>
        </div>
        <div className="text-center">
          <h4>Project # {project?.project_id}</h4>
        </div>
        <div className="text-right">
          <h4>Created: {new Date(project?.created_at).toLocaleDateString()}</h4>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-left">
          <h4>
            Address:{" "}
            <a href={googleMapsLoc} target="_blank" className="text-blue-500">
              {project?.address_one}
            </a>
          </h4>
        </div>
        <div className="text-right">
          <h4>City: {project?.city}</h4>
        </div>
        <div className="text-left">
          <h4>State: {project?.state}</h4>
        </div>
        <div className="text-right">
          <h4>Zip: {project?.zip_code}</h4>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="text-left">
          <h4>Scope of Work:</h4>
        </div>
        <div className="text-left">
          <h4>{project?.scope_of_work}</h4>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="text-left">
          <h4>Special Request:</h4>
        </div>
        <div className="text-left">
          <h4>{project?.special_request}</h4>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="text-left">
          <h4>Quoted Price: ${project?.quoted_price}</h4>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-right">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300">
            <Link href={`../edit/${project.project_id}`}>Edit</Link>
          </button>
        </div>
        <div className="text-left">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
      <br />
      <div className="flex justify-center items-center">
        <Link href={"../allprojects"} className="text-center text-blue-500">
          Back To All Projects
        </Link>
      </div>
      <Modal modalStatus={modalStatus} handleButtonClick={handleButtonClick} />
    </>
  );
}
