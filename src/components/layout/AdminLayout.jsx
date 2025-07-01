"use client";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  ExpandLess,
  ExpandMore,
  InsertDriveFile,
  BarChart,
} from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import { useRouter, usePathname, use } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Logo from "@/assets/logo.png";
import { Badge, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DropSpinner from "@/components/admin/spinner/DropSpinner"
import { useRole } from "@/hooks/useRole";
import { GetPendingOrderService } from '@/services/orderService';
import { GetMedicineListService } from '@/services/countService';

const drawerWidth = 220;

function AdminLayout(props) {
  const { countList } = useSelector((state) => state.countData)
  const [open, setOpen] = React.useState(false)
  const [isAwareness, setIsAwareness] = React.useState(false)
  const { loading } = useSelector((state) => state.common)
  const matches = useMediaQuery("(min-width:600px)");
  const { window } = props;
  const router = useRouter();
  const pathName = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const dispatch = useDispatch()
  const { role } = useRole()
  const [label, setLabel] = useState('')

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleAwarenessToggle = () => {
    setIsAwareness(!isAwareness)
  }

  const logout = async () => {
    await localStorage.removeItem('token')
    await localStorage.removeItem('role')
    router.replace('/')
  }
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const pathText = (text) => {
    const newSplit = text.split('/');
    const newStr = newSplit[2]
    if (newStr === undefined) {
      return "Dashboard"
    } else {
      return newStr
    }
  }

  useEffect(() => {
    const token = ""
    console.log(token);

    if (!role) {
      // navigateTo('adminlogin');
      router.replace(`/adminlogin`);
    }


  }, [router]);

  useEffect(() => {
    // dispatch(GetPendingOrderService(1, 0))
    dispatch(GetMedicineListService())
  }, []);

  useEffect(() => {
    const labelFilter = mainMenu.filter((item) => item.path === pathName)
    setLabel(labelFilter[0]?.name)
  },[pathName])

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={() => router.push('/admin/orders/Pending')}
        >
          <Badge badgeContent={countList?.pending_orders} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>New Orders</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const userRoutes = [
    {
      id: 1,
      path: "/admin",
      name: "Dashboard",
    },
    {
      id: 2,
      path: "/admin/medicine",
      name: "Medicine",
    },
    {
      id: 3,
      path: "/admin/awareness",
      name: "Awareness List",
    },
    {
      id: 4,
      path: "/admin/customers",
      name: "Customers Data",
    },
    {
      id: 5,
      path: "/admin/ayushcategory",
      name: "Ayush List",
    },
    {
      id: 6,
      path: "/admin/healthstorecat",
      name: "Health Store",
    },
    {
      id: 7,
      path: "/admin/storedevicecat",
      name: "Health Care Device",
    },
    {
      id: 8,
      path: "/admin/userquestions",
      name: "User Questions",
    },
    {
      id: 9,
      path: "/admin/contactus",
      name: "User Contact Us",
    },
    {
      id: 10,
      path: "/admin/reporterror",
      name: "Report Error",
    },
    {
      id: 11,
      path: "/admin/lab-list",
      name: "Lab List",
    },
    {
      id: 12,
      path: "/admin/orders",
      name: "Orders",
    },
    {
      id: 13,
      path: "/admin/scan-list",
      name: "Scan List",
    },
    {
      id: 14,
      path: "/admin/doctors",
      name: "Doctors",
    },
    {
      id: 15,
      path: "/admin/imageslist",
      name: "Images List",
    },
    {
      id: 16,
      path: "/admin/locationlist",
      name: "Delivery Location",
    },
    {
      id: 17,
      path: "/admin/addgenericstock",
      name: "Add avail stock all generic",
    },
    {
      id: 18,
      path: "/admin/notify",
      name: "Notify",
    },
    {
      id: 19,
      path: "/admin/orderprescription",
      name: "Order Prescription",
    },
    {
      id: 20,
      path: "/admin/pagemetalist",
      name: "Page Meta Tag",
    },
    {
      id: 21,
      path: "/admin/contractlist",
      name: "Contract List",
    },
        {
      id: 22,
      path: "/admin/contractuser",
      name: "Contract User",
    },
  ];

  const staffRoutes = [
    {
      id: 1,
      path: "/admin",
      name: "Dashboard",
    },
    {
      id: 2,
      path: "/admin/medicine",
      name: "Medicine",
    },
    {
      id: 3,
      path: "/admin/awareness",
      name: "Awareness List",
    }
  ];

  const mainMenu = role === "admin" ? userRoutes.slice(0, 22) : staffRoutes.slice(0, 3);
  const filteredRoutes = userRoutes.slice(22, 22);
  const filtereTwodRoutes = userRoutes.slice(22, userRoutes.length);
  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <Box sx={{ background: "#fff", py: 1 }}>
        <Image priority src={Logo} alt="Logo" className="logoIcon" />
      </Box>

      <Divider />
      <List>
        {mainMenu.map((item, i) => (
          <Link
            href={{
              pathname: item.path,
              // query: { name: 'test' },
            }}
            key={i}
          >
            <ListItem
              sx={{
                // marginTop: 1,
                backgroundColor: pathName === item.path ? "#ae0e49" : null,
                color: pathName === item.path ? "#fff" : "#ae0e49",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#00a65a",
                  color: "#fff"
                },
              }}
              onClick={() => {
                router.push(item.path, { s: "test" });
                setLabel(item.name)
                setMobileOpen(false);
              }}
            >

              <ListItemText
                variant="body1"
                color={pathName === item.path ? "#fff" : "#ae0e49"}
                fontFamily={"Poppins"}
                fontSize={14}
                sx={{ fontWeight: 600 }}
              >
                {item.name}
              </ListItemText>

            </ListItem>
          </Link>
        ))}
      </List>

      <List>
        {/* <ListItem disablePadding>
          <ListItemButton onClick={handleToggle}>
            <Typography variant="body1" fontFamily={"Poppins"} fontSize={14} color='#fff'>
              Prouduct Author Details
            </Typography>
            {open ? <ExpandLess sx={{ color: '#fff', marginLeft: 'auto' }} /> : <ExpandMore sx={{ color: '#fff', marginLeft: 'auto' }} />}
          </ListItemButton>
        </ListItem> */}

        {/* <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              href={{
                pathname: userRoutes[5].path,
              }}
            >
              <ListItem sx={{ pl: 4 }} style={{
                marginTop: 8,
                backgroundColor: pathName === userRoutes[5].path ? "#00a65a" : null,
              }}
                onClick={() => {
                  router.push(userRoutes[5].path);
                  setMobileOpen(false);
                }}
              >
                <Typography
                  variant="body1"
                  color={pathName === userRoutes[5].path ? "#fff" : "#fff"}
                  fontFamily={"Poppins"}
                  fontSize={14}
                >
                  {userRoutes[5].name}
                </Typography>
              </ListItem>
            </Link>
            <Link
              href={{
                pathname: userRoutes[6].path,
              }}
            >
              <ListItem sx={{ pl: 4 }} style={{
                marginTop: 8,
                backgroundColor: pathName === userRoutes[6].path ? "#00a65a" : null,
              }}
                onClick={() => {
                  router.push(userRoutes[6].path);
                  setMobileOpen(false);
                }}
              >
                <Typography
                  variant="body1"
                  color={pathName === userRoutes[6].path ? "#fff" : "#fff"}
                  fontFamily={"Poppins"}
                  fontSize={14}
                >
                  {userRoutes[6].name}
                </Typography>
              </ListItem>
            </Link>
          </List>
        </Collapse> */}

        {/* <ListItem disablePadding>
          <ListItemButton onClick={handleAwarenessToggle}>
            <Typography variant="body1" fontFamily={"Poppins"} fontSize={14} color='#fff'>
              Awareness
            </Typography>
            {isAwareness ? <ExpandLess sx={{ color: '#fff', marginLeft: 'auto' }} /> : <ExpandMore sx={{ color: '#fff', marginLeft: 'auto' }} />}
          </ListItemButton>
        </ListItem> */}

        {/* <Collapse in={isAwareness} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {filteredRoutes.map((item, i) =>
              <Link
                key={i}
                href={{
                  pathname: item.path,
                }}
              >
                <ListItem sx={{ pl: 4 }} style={{
                  marginTop: 8,
                  backgroundColor: pathName === item.path ? "#00a65a" : null,
                }}
                  onClick={() => {
                    router.push(item.path);
                    setMobileOpen(false);
                  }}
                >
                  <Typography
                    variant="body1"
                    color={pathName === item.path ? "#fff" : "#fff"}
                    fontFamily={"Poppins"}
                    fontSize={14}
                  >
                    {item.name}
                  </Typography>
                </ListItem>
              </Link>
            )}
          </List>
        </Collapse> */}

        {filtereTwodRoutes.map((item, i) => (
          <Link
            href={{
              pathname: item.path,
              // query: { name: 'test' },
            }}
            key={i}
          >
            <ListItem
              sx={{
                marginTop: -2,
                backgroundColor: pathName === item.path ? "#ae0e49" : null,
                color: pathName === item.path ? "#fff" : "#ae0e49",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#00a65a",
                  color: "#fff"
                },
              }}
              onClick={() => {
                router.push(item.path, { s: "test" });
                setMobileOpen(false);
              }}
            >
              <ListItemText
                variant="body1"
                color={pathName === item.path ? "#fff" : "#ae0e49"}
                fontFamily={"Poppins"}
                fontSize={14}
                sx={{ fontWeight: 600 }}
              >
                {item.name}
              </ListItemText>

            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={3}
        component="nav"
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#ae0e49",
        }}
      >
        <Toolbar>
          {!matches ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          <Typography
            variant="h6"
            noWrap
            component="div"
            fontFamily={"Poppins"}
          // sx={{ display: { xs: "none", sm: "block" } }}
          >
            {label}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => router.push('/admin/orders/Pending')}
            >
              <Badge badgeContent={countList?.pending_orders} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          backgroundColor: "#24282c",
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          elevation={6}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          elevation={6}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#fff",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#fff",
        }}
      >
        {loading && <DropSpinner />}
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

export default AdminLayout;
