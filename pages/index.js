import { Box, Button, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Head from "next/head";
import Script from 'next/script';
import Fetch from "../components/api/Fetch";
import { FormArray, FormFetch } from "../components/Context/FormFetch";
import { FormPrimaryButton } from "../components/UI/Forms/Form";
import Icon from "../components/UI/Icon";
import FormModels from "./components/FormModels";

import { IoLogoLaravel, IoLogoReact, IoCodeDownloadOutline } from 'react-icons/io5'
import GettingStarted from "./components/GettingStarted";


export default function Home() {


  return (
    <div>
      <Head>
        <title>Form builder</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script src="https://tailwind-elements.com/js/index.min.js"></Script>

      <main className="px-10 py-8">
        <div className="bg-white p-4 rounded-lg">

          <Heading>Laravel React Form builder</Heading>

          <Tabs className="mt-6">
            <TabList>
              <Tab>Start Project</Tab>
              <Tab><Flex justifyContent='center' justifyItems='center' gap={1}><div><IoLogoLaravel className='w-full h-full' /></div> <div>Laravel</div></Flex></Tab>
              <Tab><Flex justifyContent='center' justifyItems='center' gap={1}><div><IoLogoReact className='w-full h-full' /></div> <div>React</div></Flex></Tab>
            </TabList>

            <TabPanels>
              
              <TabPanel>
              <GettingStarted/>
              </TabPanel>
              <TabPanel>
                <Fetch endpoint="/api/laravel">
                  {(data) => {
                    return (
                      <FormFetch action="/api/laravel" data={data}>
                        {({ loading }) => {
                          return (
                            <>
                              <FormModels models={data.models} />
                              <Button type="submit" className="mt-2" isLoading={loading}>Submit</Button>
                            </>
                          )
                        }}
                      </FormFetch>
                    )
                  }}
                </Fetch>
              </TabPanel>

              <TabPanel>
                React
              </TabPanel>
            </TabPanels>
          </Tabs>


          {/* <h1 className="text-3xl mb-4 text-center italic font-bold">Form</h1> */}

        </div>
      </main>
    </div>
  );
}
