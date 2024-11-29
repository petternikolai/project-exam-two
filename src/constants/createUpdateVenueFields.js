/**
 * Fields configuration for venue forms.
 */
const createUpdateVenueFields = [
  {
    label: "Venue Name",
    id: "venueName",
    name: "venueName",
    type: "input",
    required: false,
    defaultValue: (editingVenue) => editingVenue?.name || "",
  },
  {
    label: "Venue Description",
    id: "venueDescription",
    name: "venueDescription",
    type: "textarea",
    required: false,
    defaultValue: (editingVenue) => editingVenue?.description || "",
  },
  {
    label: "Venue Price",
    id: "venuePrice",
    name: "venuePrice",
    type: "input",
    required: false,
    defaultValue: (editingVenue) => editingVenue?.price || "",
  },
  {
    label: "Venue Capacity",
    id: "venueCapacity",
    name: "venueCapacity",
    type: "input",
    required: false,
    defaultValue: (editingVenue) => editingVenue?.maxGuests || "",
  },
  {
    label: "Address (Optional)",
    id: "venueAddress",
    name: "venueAddress",
    type: "input",
    required: false,
    defaultValue: (editingVenue) => editingVenue?.location?.address || "",
  },
  {
    label: "City (Optional)",
    id: "venueCity",
    name: "venueCity",
    type: "input",
    required: false,
    defaultValue: (editingVenue) => editingVenue?.location?.city || "",
  },
  {
    label: "Zip Code (Optional)",
    id: "venueZip",
    name: "venueZip",
    type: "input",
    required: false,
    defaultValue: (editingVenue) => editingVenue?.location?.zip || "",
  },
  {
    label: "Country (Optional)",
    id: "venueCountry",
    name: "venueCountry",
    type: "input",
    required: false,
    defaultValue: (editingVenue) => editingVenue?.location?.country || "",
  },
  {
    label: "Latitude (Optional)",
    id: "venueLat",
    name: "venueLat",
    type: "input",
    required: false,
    defaultValue: (editingVenue) => editingVenue?.location?.lat || "",
  },
  {
    label: "Longitude (Optional)",
    id: "venueLng",
    name: "venueLng",
    type: "input",
    required: false,
    defaultValue: (editingVenue) => editingVenue?.location?.lng || "",
  },
  {
    label: "Image URL (Optional)",
    id: "venueImageUrl",
    name: "venueImageUrl",
    type: "input",
    required: false,
    defaultValue: (editingVenue) => editingVenue?.media?.[0]?.url || "",
  },
  {
    label: "Image Alt Text (Optional)",
    id: "venueImageAlt",
    name: "venueImageAlt",
    type: "input",
    required: false,
    defaultValue: (editingVenue) => editingVenue?.media?.[0]?.alt || "",
  },
  {
    label: "Rating (Optional)",
    id: "venueRating",
    name: "venueRating",
    type: "radio",
    options: [1, 2, 3, 4, 5],
    defaultCheckedValue: (editingVenue) => editingVenue?.rating || 0,
  },
  {
    label: "Amenities (Optional)",
    id: "venueAmenities",
    name: "venueAmenities",
    type: "checkbox",
    options: [
      {
        label: "Wifi",
        id: "venueWifi",
        name: "venueWifi",
        defaultChecked: (editingVenue) => !!editingVenue?.meta?.wifi,
      },
      {
        label: "Parking",
        id: "venueParking",
        name: "venueParking",
        defaultChecked: (editingVenue) => !!editingVenue?.meta?.parking,
      },
      {
        label: "Breakfast",
        id: "venueBreakfast",
        name: "venueBreakfast",
        defaultChecked: (editingVenue) => !!editingVenue?.meta?.breakfast,
      },
      {
        label: "Pets Allowed",
        id: "venuePets",
        name: "venuePets",
        defaultChecked: (editingVenue) => !!editingVenue?.meta?.pets,
      },
    ],
  },
];

export default createUpdateVenueFields;