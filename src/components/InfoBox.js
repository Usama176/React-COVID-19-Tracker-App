import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../components_css/InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, ...props }) {

  return (
    <Card
      onClick={props.onClick}
      // if active then add infoBox--selected and if it contain isRed prop add infoBox--red
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
         <h4 className= "infoBox__title" >{title}</h4>
        </Typography>
        
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
