import {
  CalendarDays,
  HeartHandshake,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react"

const unsplash = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

export const avatarImages = [
  unsplash("1494790108377-be9c29b29330", 96, 96),
  unsplash("1507003211169-0a1dd7228f2d", 96, 96),
  unsplash("1438761681033-6461ffad8d80", 96, 96),
  unsplash("1472099645785-5658abf4ff4e", 96, 96),
  unsplash("1500648767791-00dcc994a43e", 96, 96),
]

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
]

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  iconClassName: string
}

export const features: Feature[] = [
  {
    icon: CalendarDays,
    title: "Organize Events",
    description: "Plan community events with ease",
    iconClassName:
      "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300",
  },
  {
    icon: Users,
    title: "Join & Participate",
    description: "Be a part of meaningful volunteerism",
    iconClassName:
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300",
  },
  {
    icon: HeartHandshake,
    title: "Create Impact",
    description: "Support a greener & healthier community",
    iconClassName:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Platform",
    description: "Safe, secure & reliable",
    iconClassName:
      "bg-teal-100 text-teal-600 dark:bg-teal-500/15 dark:text-teal-300",
  },
]

export interface EventItem {
  id: string
  title: string
  tag: string
  tagClassName: string
  location: string
  date: string
  joined: number
  image: string
  imageAlt: string
}

export const events: EventItem[] = [
  {
    id: "tree-plantation-drive",
    title: "Tree Plantation Drive",
    tag: "Registration",
    tagClassName:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    location: "Mirpur 10, Dhaka",
    date: "Nov 12, 2026",
    joined: 18,
    image: unsplash("1542601906990-b4d3fb778b09", 640, 400),
    imageAlt: "Hands holding a young seedling in soil",
  },
  {
    id: "winter-clothes-distribution",
    title: "Winter Clothes Distribution",
    tag: "Donation",
    tagClassName:
      "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
    location: "Mohammadpur, Dhaka",
    date: "Nov 20, 2026",
    joined: 65,
    image: unsplash("1532629345422-7515f3d16bb6", 640, 400),
    imageAlt: "Hands holding a handwritten make a change note with coins",
  },
  {
    id: "clean-our-city",
    title: "Clean Our City",
    tag: "Cleanup",
    tagClassName:
      "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
    location: "Gulshan, Dhaka",
    date: "Nov 25, 2026",
    joined: 72,
    image: unsplash("1526951521990-620dc14c214b", 640, 400),
    imageAlt: "Plastic waste washed up on a beach ready to be cleaned",
  },
]

export const heroImage = unsplash("1593113646773-028c64a8f1b8", 1000, 800)

export interface GalleryItem {
  image: string
  imageAlt: string
}

export const galleryItems: GalleryItem[] = [
  {
    image: unsplash("1488521787991-ed7bbaae773c", 480, 360),
    imageAlt: "Group of children cheering together",
  },
  {
    image: unsplash("1552664730-d307ca884978", 480, 360),
    imageAlt: "Volunteers planning a community workshop",
  },
  {
    image: unsplash("1441974231531-c6227db76b6e", 480, 360),
    imageAlt: "Sunlit forest path",
  },
  {
    image: unsplash("1469571486292-0ba58a3f068b", 480, 360),
    imageAlt: "Hands joined in a circle showing teamwork",
  },
  {
    image: unsplash("1509099836639-18ba1795216d", 480, 360),
    imageAlt: "Smiling children at a community program",
  },
  {
    image: unsplash("1470071459604-3b5ec3a7fe05", 480, 360),
    imageAlt: "Green hills under a bright sky",
  },
]

export const footerLinkGroups = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "#home" },
      { label: "Upcoming Events", href: "#events" },
      { label: "Create Event", href: "#home" },
      { label: "About Us", href: "#about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "#contact" },
      { label: "Privacy Policy", href: "#contact" },
      { label: "Terms & Condition", href: "#contact" },
    ],
  },
]
