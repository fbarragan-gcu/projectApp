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
  // Open/Close Modal State
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  // Open/Close Modal Function
  const toggleModal1 = () => {
    setIsOpen1(!isOpen1);
  };
  const toggleModal2 = () => {
    setIsOpen2(!isOpen2);
  };

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

  // Delete btn clicked
  const handleDelete = () => {
    // Handle Delete Modal
    console.log(
      `Initializing project deletion for ProjectId:${project?.project_id}`
    );
    // Open Model to confirm delete
    confirmDelete();
  };

  // Initial Delete Modal
  const confirmDelete = async () => {
    const projectId = project?.project_id;
    // Set Modal Options
    setModalStatus({
      title: "Confirm Delete",
      status: `Are you sure you want to delete Project ${projectId}`,
      css: "bg-teal-500 hover:bg-teal-600",
    });
    // Opens Modal if OK clicked
    toggleModal1();
  };

  // Handle Modal 1 OK button
  const handleConfirmButtonClick = () => {
    // Clicked OK to delete
    console.log("Ok Clicked 1");
    console.log("Proceeding to Delete Project");
    // Proceed to delete project
    processDelete();
    console.log("Project Deletion confirmed");
  };

  // Deletion Successful Modal
  const processDelete = async () => {
    const projectId = project?.project_id;
    // Set Modal Options
    setModalStatus({
      title: "Deletion Successfull",
      status: `Project ${projectId} has been deleted`,
      css: "bg-teal-500 hover:bg-teal-600",
    });
    // Opens Modal
    deleteProject();
    toggleModal2();
  };

  // Handle Modal 2 OK button
  // Confirms delete and navigate to all-projects
  const handleConfirmButtonClick1 = () => {
    console.log("Ok Clicked 2");
    console.log("Project Deletion conmpleted");
    router.push("../all-projects");
  };

  const deleteProject = async () => {
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
      console.log("Project Deleted");
    } catch (error) {
      console.error("Error deleting project");
      // Set Modal Options
      setModalStatus({
        title: "Error Deleting Project",
        status: `Project ${projectId} has not been deleted`,
        css: "bg-red-500 hover:bg-red-600",
      });
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
          <Link href="../all-projects" className="text-center text-blue-500">
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
              href={`../../customers/display-customer/${customerInfo?.customer_id}`}
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
        <Link href={"../all-projects"} className="text-center text-blue-500">
          Back To All Projects
        </Link>
      </div>
      {/* Initial Delete Click */}
      <Modal
        modalStatus={modalStatus}
        handleOkClick={handleConfirmButtonClick}
        isOpen={isOpen1}
        toggleModal={toggleModal1}
        showCancelButton={true}
      />
      {/* Confirmation of Delete */}
      <Modal
        modalStatus={modalStatus}
        handleOkClick={handleConfirmButtonClick1}
        isOpen={isOpen2}
        toggleModal={toggleModal2}
        showCancelButton={false}
      />
    </>
  );
}
