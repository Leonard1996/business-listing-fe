export default function RoleBasedInput({ view, filter, children, mode, all }) {
  const hasPermission = () => {
    if (all) return true;
    try {
      let { role } = JSON.parse(localStorage.getItem("user"));
      role = role.toLowerCase();
      if (mode === "view") return view.includes(role);
      return mode === "filter" && filter.includes(role);
    } catch (error) {
      console.log(error);
      if (mode === "view") return view.includes("viewer");
      return mode === "filter" && filter.includes("viewer");
    }
  };

  return <>{hasPermission() ? children : null}</>;
}
