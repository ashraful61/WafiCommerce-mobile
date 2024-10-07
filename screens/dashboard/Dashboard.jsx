import { Heading, HStack, Link, ScrollView, Text } from "@gluestack-ui/themed";
import DefaultBalance from "../../components/dashboard/DefaultBalance";
import SalesTrend from "../../components/dashboard/SalesTrend";
import SalesCategory from "../../components/dashboard/SalesCategory";
import TopSellingProduct from "../../components/dashboard/TopSellingProduct";
import { LinkText } from "@gluestack-ui/themed";

const Dashboard = ({ navigation }) => {
  return (
    <ScrollView>
      <HStack p="$4">
        <Text>Go to your Profile</Text>
        <Link onPress={() => navigation.navigate("Profile")}>
          <LinkText color="blue">Click here!</LinkText>
        </Link>
      </HStack>
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
