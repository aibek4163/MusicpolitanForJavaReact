import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import DescriptionIcon from "@material-ui/icons/Description";
import NotesIcon from "@material-ui/icons/Notes";
import AlbumIcon from "@material-ui/icons/Album";
import TextsmsIcon from "@material-ui/icons/Textsms";
import GroupIcon from "@material-ui/icons/Group";

import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Link to="/admin/users">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>

    <Link to="/admin/managenews">
      <ListItem button>
        <ListItemIcon>
          <FilterNoneIcon />
        </ListItemIcon>
        <ListItemText primary="News" />
      </ListItem>
    </Link>

    <Link to="/admin/managereleases">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Releases" />
      </ListItem>
    </Link>

    <Link to="/admin/managetop">
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="TopMusics" />
      </ListItem>
    </Link>

    <Link to="/admin/managereviews">
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Reviews" />
      </ListItem>
    </Link>

    <Link to="/admin/managearcticles">
      <ListItem button>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Articles" />
      </ListItem>
    </Link>
    <Link to="/admin/managegenres">
      <ListItem button>
        <ListItemIcon>
          <NotesIcon />
        </ListItemIcon>
        <ListItemText primary="Genres" />
      </ListItem>
    </Link>
    <Link to="/admin/managealbums">
      <ListItem button>
        <ListItemIcon>
          <AlbumIcon />
        </ListItemIcon>
        <ListItemText primary="Albums" />
      </ListItem>
    </Link>
    <Link to="/admin/manageartists">
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Artists" />
      </ListItem>
    </Link>
    <Link to="/admin/managecomments">
      <ListItem button>
        <ListItemIcon>
          <TextsmsIcon />
        </ListItemIcon>
        <ListItemText primary="Comments" />
      </ListItem>
    </Link>
  </div>
);

// export const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );
