import { Button } from "~/components/ui/Button";
import { TextField } from "~/components/ui/TextField";
import type { Route } from "./+types/settings";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Settings - TCG Vendor" }];
}

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your account and store preferences.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Profile</h2>
        <div className="bg-[#141414] border border-gray-800 rounded-xl p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="First Name"
              defaultValue="Test"
              className="[&_label]:text-gray-300 [&_label]:text-sm [&_input]:bg-transparent [&_input]:border-gray-700 [&_input]:text-gray-300"
            />
            <TextField
              label="Last Name"
              defaultValue="User"
              className="[&_label]:text-gray-300 [&_label]:text-sm [&_input]:bg-transparent [&_input]:border-gray-700 [&_input]:text-gray-300"
            />
          </div>
          <TextField
            label="Email"
            type="email"
            defaultValue="test@example.com"
            className="[&_label]:text-gray-300 [&_label]:text-sm [&_input]:bg-transparent [&_input]:border-gray-700 [&_input]:text-gray-300"
          />
          <div className="pt-2">
            <Button>Save Changes</Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Store</h2>
        <div className="bg-[#141414] border border-gray-800 rounded-xl p-5 space-y-4">
          <TextField
            label="Store Name"
            defaultValue="My TCG Store"
            className="[&_label]:text-gray-300 [&_label]:text-sm [&_input]:bg-transparent [&_input]:border-gray-700 [&_input]:text-gray-300"
          />
          <TextField
            label="Store URL"
            defaultValue="my-tcg-store"
            className="[&_label]:text-gray-300 [&_label]:text-sm [&_input]:bg-transparent [&_input]:border-gray-700 [&_input]:text-gray-300"
          />
          <div className="pt-2">
            <Button>Save Changes</Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-red-400">Danger Zone</h2>
        <div className="bg-[#141414] border border-red-900/50 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-3">
            Permanently delete your account and all associated data.
          </p>
          <Button
            className="bg-red-600 hover:bg-red-700 border-red-600 text-white"
          >
            Delete Account
          </Button>
        </div>
      </section>
    </div>
  );
}
