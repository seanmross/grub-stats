import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// const foodNutrients = {
//   1003: "Protein",
//   1004: "Total lipid (fat)",
//   1005: "Carbohydrate, by difference",
//   1008: "Energy",
//   1258: "Fatty acids, total saturated",
// };

const styles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const getNutrientValue = (nutrients = [], id) => {
  const nutrient = nutrients.filter(
    (n) => n.nutrientId === id
  );
  return nutrient[0] ? nutrient[0].value : "-";
};

const FoodsTable = ({ data }) => {
  return (
    data &&
    data.length > 0 && (
      <TableContainer component={Paper}>
        <Table className={styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Food (100g/3.5oz serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((food) => (
                <TableRow key={food.fdcId}>
                  <TableCell component="th" scope="row">
                    {food.description}
                  </TableCell>
                  <TableCell align="right">
                    {/** CALORIES */}
                    {getNutrientValue(food.foodNutrients, 1008)}
                  </TableCell>
                  <TableCell align="right">
                    {/** FAT */}
                    {getNutrientValue(food.foodNutrients, 1004)}
                  </TableCell>
                  <TableCell align="right">
                    {/** CARBS */}
                    {getNutrientValue(food.foodNutrients, 1005)}
                  </TableCell>
                  <TableCell align="right">
                    {/** PROTEIN */}
                    {getNutrientValue(food.foodNutrients, 1003)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default FoodsTable;