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
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Link from "next/link";
import { useEffect, useState } from "react";

// Fetch data and render the PDF, allow for download
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
  // TODO: Make contract nicer
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

  // Create the PDF Object document
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

  // Show loading or Error stage
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
      {/* Display Built-in PDF viewer */}
      <PDFViewer width="100%" height="800px">
        <ProjectDocument customerInfo={customerInfo} project={project} />
      </PDFViewer>
      <div className="flex justify-center items-center pt-4">
        {/* PDFDownloadLink inside a styled button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          onClick={() => {
            // Handle the PDF download
          }}
        >
          <PDFDownloadLink
            document={
              <ProjectDocument customerInfo={customerInfo} project={project} />
            }
            // Specify default file name
            fileName={`project_${project.project_id}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Generating PDF..." : "Download PDF"
            }
          </PDFDownloadLink>
        </button>
      </div>
      <div className="flex justify-center items-center pt-4">
        <Link href="../all-projects" className="text-center text-blue-500">
          Back to all projects
        </Link>
      </div>
    </>
  );
}
