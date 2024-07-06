// "use client";
// import { Customer, Project } from "@/app/lib/definitions";
// import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// // Export to PDF file
// export default function CreatePDF({ params }: { params: { slug: string } }) {
//   const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
//   const [project, setProjects] = useState<Project>();
//   const [loading, setLoading] = useState(true);

//   // Pull Projects by Slug ID
//   useEffect(() => {
//     if (params.slug) {
//       const getProjectAndCustomer = async () => {
//         try {
//           // Fetch project info first
//           const projectRes = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.slug}`,
//             { cache: "no-store" }
//           );
//           if (!projectRes.ok) {
//             throw new Error(`Failed to fetch project by id: ${params.slug}`);
//           }
//           const project = await projectRes.json();
//           setProjects(project);

//           // Then fetch customer using project's customer_id
//           const customerRes = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL}/api/customers/${project.customer_id}`,
//             { cache: "no-store" }
//           );
//           if (!customerRes.ok) {
//             throw new Error(
//               `Failed to fetch customer id: ${project.customer_id}`
//             );
//           }
//           const customer = await customerRes.json();
//           setCustomerInfo(customer);
//           // Set loading to false after both requests complete
//           setLoading(false);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//           // Ensure loading is set to false on error
//           setLoading(false);
//         }
//       };

//       getProjectAndCustomer();
//     }
//   }, [params.slug]);

//   // Display project location on Google Maps
//   const googleMapsLoc = `https://www.google.com/maps/search/?api=1&query=${project?.address_one}+${project?.city}+${project?.state}`;

//   // Display loading while pulling data
//   if (loading) return <div>Loading...</div>;
//   // Display Project not found if error with Project ID
//   if (!project)
//     return (
//       <div>
//         Project with ID: {params.slug} not found
//         <div className="flex justify-center items-center pt-4">
//           <Link href="../all-projects" className="text-center text-blue-500">
//             Back to all projects
//           </Link>
//         </div>
//       </div>
//     );

//   // Return Regular Customer page
//   return (
//     <>
//       <Document>
//         <div className="grid grid-cols-3 gap-4 pb-2">
//           <div className="text-left">
//             <h4>
//               Customer:
//               <Link
//                 className="text-blue-500"
//                 href={`../../customers/display-customer/${customerInfo?.customer_id}`}
//               >
//                 {` ${customerInfo?.first_name} ${customerInfo?.last_name}`}
//               </Link>
//             </h4>
//           </div>
//           <div className="text-center">
//             <h4>Project # {project?.project_id}</h4>
//           </div>
//           <div className="text-right">
//             <h4>
//               Created: {new Date(project?.created_at).toLocaleDateString()}
//             </h4>
//           </div>
//         </div>
//         <div className="grid grid-cols-4 gap-4">
//           <div className="text-left">
//             <h4>
//               Address:{" "}
//               <a href={googleMapsLoc} target="_blank" className="text-blue-500">
//                 {project?.address_one}
//               </a>
//             </h4>
//           </div>
//           <div className="text-right">
//             <h4>City: {project?.city}</h4>
//           </div>
//           <div className="text-left">
//             <h4>State: {project?.state}</h4>
//           </div>
//           <div className="text-right">
//             <h4>Zip: {project?.zip_code}</h4>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 gap-4">
//           <div className="text-left">
//             <h4>Scope of Work:</h4>
//           </div>
//           <div className="text-left">
//             <h4>{project?.scope_of_work}</h4>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 gap-4">
//           <div className="text-left">
//             <h4>Special Request:</h4>
//           </div>
//           <div className="text-left">
//             <h4>{project?.special_request}</h4>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 gap-4">
//           <div className="text-left">
//             <h4>Quoted Price: ${project?.quoted_price}</h4>
//           </div>
//         </div>
//       </Document>
//     </>
//   );
// }

// TEST
"use client";
import { Customer, Project } from "@/app/lib/definitions";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Link as PDFLink,
  Image as PDFImage,
} from "@react-pdf/renderer";
import Link from "next/link";
import { useEffect, useState } from "react";

// Fetch data and render the PDF
export default function CreatePDF({ params }: { params: { slug: string } }) {
  const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
  const [project, setProjects] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      const getProjectAndCustomer = async () => {
        try {
          const projectRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.slug}`,
            { cache: "no-store" }
          );
          if (!projectRes.ok) {
            throw new Error(`Failed to fetch project by id: ${params.slug}`);
          }
          const project = await projectRes.json();
          setProjects(project);

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
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };

      getProjectAndCustomer();
    }
  }, [params.slug]);

  // Basic Styling for PDF Document
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
    },
    section: {
      margin: 10,
      padding: 10,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    image: {
      width: 130,
      height: 100,
      marginBottom: 10,
    },
    link: {
      color: "blue",
      textDecoration: "none",
    },
  });

  // Create the PDF document
  const ProjectDocument = ({
    customerInfo,
    project,
  }: {
    customerInfo: Customer | null;
    project: Project | null;
  }) => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <PDFImage style={styles.image} src="/images/logo1.png" />
          <Text>
            Customer: {`${customerInfo?.first_name} ${customerInfo?.last_name}`}
          </Text>
          <Text>Project # {project?.project_id}</Text>
          <Text>
            {" "}
            Created:{" "}
            {new Date(project?.created_at ?? "NA").toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.section}>
          <Text>
            Address:{" "}
            <PDFLink
              href={`https://www.google.com/maps/search/?api=1&query=${project?.address_one}+${project?.city}+${project?.state}`}
              style={styles.link}
            >
              {project?.address_one}
            </PDFLink>
          </Text>
          <Text>City: {project?.city}</Text>
          <Text>State: {project?.state}</Text>
          <Text>Zip: {project?.zip_code}</Text>
        </View>
        <View style={styles.section}>
          <Text>Scope of Work:</Text>
          <Text>{project?.scope_of_work}</Text>
        </View>
        <View style={styles.section}>
          <Text>Special Request:</Text>
          <Text>{project?.special_request}</Text>
        </View>
        <View style={styles.section}>
          <Text>Quoted Price: ${project?.quoted_price}</Text>
        </View>
      </Page>
    </Document>
  );

  if (loading) return <div>Loading...</div>;
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

  return (
    <>
      <PDFViewer width="100%" height="800px">
        <ProjectDocument customerInfo={customerInfo} project={project} />
      </PDFViewer>
      <div className="flex justify-center items-center pt-4">
        <Link href="../all-projects" className="text-center text-blue-500">
          Back to all projects
        </Link>
      </div>
    </>
  );
}
