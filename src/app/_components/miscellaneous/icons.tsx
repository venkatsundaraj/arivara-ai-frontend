import {
  LucideProps,
  Check,
  LayoutDashboard,
  BookOpenCheck,
  BookCheck,
  User,
  LogIn,
  Search,
  X,
  Pin,
  Ellipsis,
  LaptopMinimal,
  Clapperboard,
  Volleyball,
  Newspaper,
  Activity,
  CircleArrowRight,
  ChevronLeft,
  Command,
  LoaderCircle,
} from "lucide-react";

export const Icons = {
  Check,
  LayoutDashboard,
  ChevronLeft,
  BookOpenCheck,
  BookCheck,
  LogIn,
  Search,
  X,
  Pin,
  Ellipsis,
  LaptopMinimal,
  Clapperboard,
  Volleyball,
  Newspaper,
  Activity,
  Command,
  CircleArrowRight,
  LoaderCircle,

  User,
  ThemeIcon: (props: LucideProps) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
      <path d="M12 3l0 18"></path>
      <path d="M12 9l4.65 -4.65"></path>
      <path d="M12 14.3l7.37 -7.37"></path>
      <path d="M12 19.6l8.85 -8.85"></path>
    </svg>
  ),
  Google: (props: LucideProps) => (
    <svg {...props} className="w-5 h-5" viewBox="0 0 24 24">
      {/* Google icon */}
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  ),
  AILearning: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#000000"
      viewBox="0 0 256 256"
    >
      <path d="M192.5,171.47A88.34,88.34,0,0,0,224,101.93c-1-45.71-37.61-83.4-83.24-85.8A88,88,0,0,0,48,102L25.55,145.18c-.09.18-.18.36-.26.54a16,16,0,0,0,7.55,20.62l.25.11L56,176.94V208a16,16,0,0,0,16,16h48a8,8,0,0,0,0-16H72V171.81a8,8,0,0,0-4.67-7.28L40,152l23.07-44.34A7.9,7.9,0,0,0,64,104a72,72,0,0,1,56-70.21V49.38a24,24,0,1,0,16,0V32c1.3,0,2.6,0,3.9.1A72.26,72.26,0,0,1,203.84,80H184a8,8,0,0,0-6.15,2.88L152.34,113.5a24.06,24.06,0,1,0,12.28,10.25L187.75,96h19.79q.36,3.12.44,6.3a72.26,72.26,0,0,1-28.78,59.3,8,8,0,0,0-3.14,7.39l8,64a8,8,0,0,0,7.93,7,8.39,8.39,0,0,0,1-.06,8,8,0,0,0,6.95-8.93ZM128,80a8,8,0,1,1,8-8A8,8,0,0,1,128,80Zm16,64a8,8,0,1,1,8-8A8,8,0,0,1,144,144Z"></path>
    </svg>
  ),
  Security: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#000000"
      viewBox="0 0 256 256"
    >
      <path d="M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.3,129.3,0,0,1,128,223.62a128.25,128.25,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56,160,0ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z"></path>
    </svg>
  ),
  WhiteLabel: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#000000"
      viewBox="0 0 256 256"
    >
      <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-40-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V160H104a8,8,0,0,1,0-16h16V128a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,152Z"></path>
    </svg>
  ),
  Devices: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#000000"
      viewBox="0 0 256 256"
    >
      <path d="M224,72H208V64a24,24,0,0,0-24-24H40A24,24,0,0,0,16,64v96a24,24,0,0,0,24,24H152v8a24,24,0,0,0,24,24h48a24,24,0,0,0,24-24V96A24,24,0,0,0,224,72ZM40,168a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8v8H176a24,24,0,0,0-24,24v72Zm192,24a8,8,0,0,1-8,8H176a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Zm-96,16a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h40A8,8,0,0,1,136,208Zm80-96a8,8,0,0,1-8,8H192a8,8,0,0,1,0-16h16A8,8,0,0,1,216,112Z"></path>
    </svg>
  ),
};

export type Icon = keyof typeof Icons;
