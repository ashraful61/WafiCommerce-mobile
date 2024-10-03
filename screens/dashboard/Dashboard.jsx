import { Heading, ScrollView } from "@gluestack-ui/themed";
import DefaultBalance from "../../components/dashboard/DefaultBalance";
import SalesTrend from "../../components/dashboard/SalesTrend";
import SalesCategory from "../../components/dashboard/SalesCategory";
import TopSellingProduct from "../../components/dashboard/TopSellingProduct";

const Dashboard = () => {
  return (
    <ScrollView>
      <Heading p={16}>Dashboard</Heading>

      {/* cards summary */}
      <DefaultBalance />

      {/* line graph for sales trend */}
      {/* <SalesTrend /> */}

      {/* sales category pie chart */}
      <SalesCategory />

      {/* bar chart for top selling products */}
      <TopSellingProduct />
    </ScrollView>
  );
};

export default Dashboard;
