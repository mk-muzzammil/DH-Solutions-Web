import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import Contact1 from "@/components/contact/Contact1";
import Location from "@/components/contact/Location";
const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contact Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayout header="header3" footer="footer3">
          <Contact1 />

          <Location />
        </RootLayout>
      </main>
    </>
  );
};

export default Contact;
