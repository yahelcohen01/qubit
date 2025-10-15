import { Activity } from "@shared/types";

export function ActivityPreview({ activity }: { activity: Activity }) {
  return (
    <div className="p-4 border rounded">
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 flex items-center justify-center text-xs rounded overflow-hidden">
          {activity.img ? (
            <img
              src={activity.img}
              alt={activity.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="p-2 text-gray-500">No image</div>
          )}
        </div>
        <div>
          <div className="text-lg font-semibold">{activity.title}</div>
          <div className="text-sm text-gray-600">
            {activity.date}{" "}
            {activity.startTime ? `· ${activity.startTime}` : ""}
          </div>
          <div className="mt-2 text-sm">{activity.description}</div>

          <div className="mt-3 text-xs text-gray-600">
            <div>
              Location: {activity.location?.name}{" "}
              {activity.location?.address && `— ${activity.location.address}`}
            </div>
            <div>
              Organizer: {activity.organizer?.name}{" "}
              {activity.organizer?.email && `(${activity.organizer.email})`}
            </div>
            <div>Tags: {(activity.tags ?? []).join(", ")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
