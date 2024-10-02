import { Heading, ScrollView } from "@gluestack-ui/themed";
import DefaultBalance from "../../components/dashboard/DefaultBalance";
import SalesTrend from "../../components/dashboard/SalesTrend";

const Dashboard = () => {
  return (
    <ScrollView>
      <Heading p={16}>Dashboard</Heading>

      {/* cards summary */}
      <DefaultBalance />

      {/* line graph for sales trend */}
      <SalesTrend />
    </ScrollView>
  );
};

export default Dashboard;
