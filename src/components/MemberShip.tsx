import datas from '../data.json';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

interface Member {
  id: number;
  name: string;
  linkId: number | null;
}

interface MemberWithChildren extends Member {
  childrens: Member[];
  payable: boolean;
}

export const MemberShip = () => {
  function determineBilling(members: Member[]): MemberWithChildren[] {
    const membres: Record<number, MemberWithChildren> = members.reduce(
      (acc, member) => ({
        ...acc,
        [member.id]: {
          ...member,
          childrens: [],
          payable: member.linkId === null
        }
      }),
      {}
    );
    for (const member of members) {
      if (member.linkId !== null) {
        const parent = membres[member.linkId];
        if (parent !== undefined) {
          parent.childrens.push(member);
        }
      }
    }
    const factures = Object.values(membres)
      .filter((member) => {
        if (member.linkId !== null) {
          const parent = membres[member.linkId];
          if (parent !== undefined) {
            return false;
          }
        }
        return true;
      })
      .map((member) => member.id);
    for (const id in membres) {
      if (membres.hasOwnProperty(id)) {
        const member = membres[id];
        member.payable = factures.includes(member.id);
      }
    }
    return Object.values(membres);
  }

  const final = determineBilling(datas);

  return (
    <div className="container">
      <Grid data={final}>
        <GridColumn field="id" title="Id" width={50} />
        <GridColumn field="name" title="Name" />
        <GridColumn
          field="childrens"
          title="Childrens"
          cell={({ dataItem }) => (
            <td>
              {dataItem.childrens.map((item: any) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </td>
          )}
        />
        <GridColumn field="payable" title="Payable" />
      </Grid>
    </div>
  );
};
