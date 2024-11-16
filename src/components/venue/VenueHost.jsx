import Avatar from "../layout/Avatar";

export default function VenueHost({ owner }) {
  return (
    <div className="mt-10">
      <h3 className="text-sm font-medium text-gray-900">Your host</h3>
      {owner && owner.avatar && (
        <Avatar
          imageUrl={owner.avatar.url}
          altText={owner.avatar.alt}
          name={owner.name}
        />
      )}
    </div>
  );
}
