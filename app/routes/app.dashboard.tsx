import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  
  // You can add any server-side data fetching here
  const data = {
    timestamp: new Date().toISOString(),
    message: "Welcome to your custom dashboard!"
  };
  
  return data;
};

export default function Dashboard() {
  const data = useLoaderData<typeof loader>();

  return (
    <s-page heading="Dashboard">
      <s-section heading="Admin Dashboard">
        <s-paragraph>
          This is a simple admin embedded page that demonstrates how to create
          custom functionality within your Shopify app.
        </s-paragraph>
        
        <s-stack direction="block" gap="base">
          <s-box
            padding="base"
            borderWidth="base"
            borderRadius="base"
            background="subdued"
          >
            <s-text>Server Data:</s-text>
            <s-paragraph>Message: {data.message}</s-paragraph>
            <s-paragraph>Loaded at: {data.timestamp}</s-paragraph>
          </s-box>
          
          <s-box
            padding="base"
            borderWidth="base"
            borderRadius="base"
          >
            <s-text>Quick Actions:</s-text>
            <s-stack direction="inline" gap="base">
              <s-button variant="primary">
                Action 1
              </s-button>
              <s-button variant="secondary">
                Action 2
              </s-button>
              <s-button variant="tertiary">
                Action 3
              </s-button>
            </s-stack>
          </s-box>
        </s-stack>
      </s-section>
      
      <s-section slot="aside" heading="Dashboard Info">
        <s-paragraph>
          This dashboard page is fully embedded within the Shopify admin and
          can access all Shopify APIs through the authenticated admin context.
        </s-paragraph>
        
        <s-unordered-list>
          <s-list-item>Server-side data loading</s-list-item>
          <s-list-item>Polaris web components</s-list-item>
          <s-list-item>Shopify admin integration</s-list-item>
        </s-unordered-list>
      </s-section>
    </s-page>
  );
}