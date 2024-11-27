This is a Dashboard project based on NextJS.

## Getting Started

First, run the development server for each application i.e.(shell-app, user-profile-mfe and notifications-mfe):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

To look at individual application separately you can open:
[http://localhost:5001](http://localhost:5001) for User Profile
[http://localhost:5002](http://localhost:5002) for Notifications

You can even change the port of each application but if you do so you need to change the **.env** files of other applications too.

For state management zustand is used on each application to maintain global state such as:
Branding state: For User Profile, Notification and Shell App
Unread counts: In Shell
Whereas other states are maintained locally and are synced using postMessage.

For branding CSS variables are used based on which primary color is applied and cases for dark theme and light theme is also handled in the same way.

If any queries you can reach me out at: [sumit.sth54@gmail.com](mailto:sumit.sth54@gmail.com)
