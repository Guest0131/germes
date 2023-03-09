import { Grid, Box, useTheme } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { tokens } from "../../theme.js";
import { useSelector, useDispatch } from "react-redux";
import { Graph } from "react-d3-graph";
import { useEffect, useState } from "react";

import { getData } from "../../redux/features/rest/restSlice.js";



const onClickNode = function (nodeId) {
  window.alert(`Clicked node ${nodeId}`);
};

const onClickLink = function (source, target) {
  window.alert(`Clicked link between ${source} and ${target}`);
};

export const ResultBox = () => {
    const [dataGraph, setDataGraph] = useState({
        nodes: [
          { id: "Harry" },
          { id: "Sally" },
          { id: "Alice" },
          { id: "Harry1" },
          { id: "Sally1" },
          { id: "Alice1" },
        ],
        links: [
          { source: "Harry", target: "Sally" },
          { source: "Harry", target: "Alice" },
          { source: "Alice", target: "Harry1" },
          { source: "Alice", target: "Sally1" },
          { source: "Alice", target: "Alice1" },
        ],
      })
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {}, []);

  const restData = useSelector((state) => state.rest);
  

  const myConfig = {
    automaticRearrangeAfterDropNode: true,
    collapsible: true,
    directed: false,
    focusAnimationDuration: 0.75,
    focusZoom: 5,
    freezeAllDragEvents: false,
    height: 500,
    highlightDegree: 2,
    highlightOpacity: 0.2,
    linkHighlightBehavior: true,
    maxZoom: 12,
    minZoom: 0.05,
    nodeHighlightBehavior: true,
    panAndZoom: false,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
    width: 880,
    d3: {
      alphaTarget: 0.05,
      gravity: -250,
      linkLength: 120,
      linkStrength: 2,
      disableLinkForce: false,
    },
    node: {
      color: colors.greenAccent[600],
      size: 120,
      highlightStrokeColor: colors.redAccent[600],
      symbolType: "rectangle",
    },
    link: {
      highlightColor: colors.redAccent[600],
      color: colors.blueAccent[400],
    },
  };

  return (
    <Grid
      container
      spacing={1}
      m="30px 0 0 10%"
      width="100%"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      p="0 5% 0 0"
    >
      <Grid
        item
        md={8}
        bgcolor={
            restData.data.length && !restData.isLoading
            ? theme.palette.mode === "dark"
              ? colors.primary[100]
              : "whitesmoke"
            : colors.primary[400]
        }
        height="100%"
        borderRadius="1%"
      >
        {restData.data.length && !restData.isLoading ? (
          <Graph
            id="graph-id"
            data={dataGraph}
            config={myConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
          />
        ) : (
          <Skeleton variant="rectangular" width="99%" height={500} />
        )}
      </Grid>
      <Grid
        item
        md={3}
        bgcolor={colors.primary[400]}
        height="100%"
        borderRadius="1%"
      >
        {restData.data.length && !restData.isLoading ? (
          <>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. In magni
            deserunt aliquam eligendi modi. Rem doloribus asperiores fuga
            provident molestiae voluptas deleniti libero vitae at unde,
            repudiandae possimus tenetur rerum.
          </>
        ) : (
          <Skeleton variant="rectangular" width="98%" height={500} />
        )}
      </Grid>
    </Grid>
  );
};
