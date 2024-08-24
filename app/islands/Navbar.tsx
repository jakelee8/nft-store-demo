import { FC, useState } from "hono/jsx";

const Navbar: FC<{
  sidebarId: string;
}> = ({ sidebarId }) => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <nav class="navbar">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">NFT Store</a>
      </div>
      <div class="flex-none">
        {isConnected ? (
          <label for={sidebarId} aria-label="open cart" class="drawer-button">
            <div
              id={sidebarId}
              tabindex={0}
              role="button"
              class="btn btn-ghost btn-circle"
            >
              <div class="indicator">
                <span class="icon-[lucide--shopping-cart] mr-2"></span>
                <span class="badge badge-sm indicator-item">8</span>
              </div>
            </div>
          </label>
        ) : (
          <div
            onClick={() => {
              setIsConnected(true);
              console.log("hi");
            }}
            class="btn btn-ghost"
          >
            <span class="icon-[lucide--wallet]"></span> Connect Wallet
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
