import { getUserAccounts } from "@/actions/account";
import AddAccountSheet from "@/components/add-account-sheet";
import CenterWrapper from "@/components/center-wrapper";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { accountColumns } from "@/components/tables/accounts/accounts";
import { DataTable } from "@/components/tables/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AccountsPage = async () => {
  const accounts = await getUserAccounts();

  return (
    <CenterWrapper>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-full flex items-center justify-between">
          <h3 className="text-3xl font-bold">Accounts</h3>
          <div className="flex gap-4">
            <CalendarDateRangePicker />
            <AddAccountSheet />
          </div>
        </div>
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Recent Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={accounts} columns={accountColumns} />
          </CardContent>
        </Card>
      </div>
    </CenterWrapper>
  );
};

export default AccountsPage;
