import { Grid, Box, useTheme } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { tokens } from "../theme.js";
import { useSelector } from "react-redux";
import { Graph } from "react-d3-graph";
import { useEffect, useState } from "react";

const onClickNode = function (nodeId) {
  window.alert(`Clicked node ${nodeId}`);
};

const onClickLink = function (source, target) {
  window.alert(`Clicked link between ${source} and ${target}`);
};

export const GraphBox = () => {
  const [graphNodes, setGraphNodes] = useState([]);
  const [graphLinks, setGraphLinks] = useState([]);
  const [dataGraph, setDataGraph] = useState({
    nodes: graphNodes,
    links: graphLinks,
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { allLinks } = useSelector((state) => state.links);

  useEffect(() => {
    for (var l in allLinks) {
      if (
        allLinks[l].status &&
        "info" in allLinks[l] &&
        graphNodes.filter((x) => x.id === allLinks[l]["info"]["pre_url"]).length === 0
      ) {
        setGraphNodes(
          graphNodes.concat({
            id: allLinks[l]["info"]["pre_url"],
            info: allLinks[l]["info"],
          })
        );
      }
    }
    setDataGraph({
      nodes: graphNodes,
      links: graphLinks,
    })

  }, [allLinks ]);

  const [info, setInfo] = useState("Нихуя");



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
    <>
      {/* Draw GRAPH */}
      <Grid
        item
        md={8}
        bgcolor={
          Object.keys(allLinks).length > 0
            ? theme.palette.mode === "dark"
              ? colors.primary[100]
              : "whitesmoke"
            : colors.primary[400]
        }
        borderRadius="1%"
      >
        {Object.keys(allLinks).length ? (
          <Graph
            id="graph-id"
            data={dataGraph}
            config={myConfig}
            onClickNode={(n) => {
              setInfo(n);
            }}
            onClickLink={onClickLink}
          />
        ) : (
          <Skeleton variant="rectangular" width="99%" height={500} />
        )}
      </Grid>

      {/* Node InfoData */}
      <Grid
        item
        md={3}
        bgcolor={colors.primary[400]}
        height="85%"
        borderRadius="1%"
      >
        {Object.keys(allLinks).length ? (
          <>{info}</>
        ) : (
          <Skeleton variant="rectangular" width="98%" height={460} />
        )}
      </Grid>
    </>
  );
};

