import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const VendorData = ({ vendorData }) => {
  return (
    <div className="productVendor">
      <AccountCircleIcon />
      <span>
        {vendorData?.firstname} {vendorData?.lastname}
      </span>
    </div>
  );
};

export default VendorData;
