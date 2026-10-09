export const Logo = ({ dark = false, size = 52 }) => (
  <img
    src={dark ? "/logo.png" : "/logo-cream.png"}
    alt="Plantstiks Pack — The 100% Plant Based Bottle Pack"
    height={size}
    style={{ height: size, width: "auto" }}
    className="select-none"
    data-testid="plantstiks-logo"
  />
);
