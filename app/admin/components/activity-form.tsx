"use client";
import { Activity } from "@shared/types";
import { Button } from "./button";
import { useState } from "react";
import { Checkbox } from "@/app/components/checkbox";

export function ActivityForm({
  activity,
  onChange,
}: {
  activity: Activity | null;
  onChange: (p: Partial<Activity>) => void;
}) {
  const [imageUploadInput, setImageUploadInput] = useState<
    "upload" | "url" | undefined
  >("url");

  if (!activity) return null;

  return (
    <div className="space-y-3 bg-neutral-900 p-4 rounded">
      <div>
        <label className="block text-xs">ID</label>
        <input
          value={activity.id}
          disabled
          className="w-full px-3 py-2 rounded bg-neutral-800 cursor-not-allowed opacity-50"
        />
      </div>

      <div>
        <label className="block text-xs">Title</label>
        <input
          value={activity.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full px-3 py-2 rounded bg-neutral-800"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs">Date</label>
          <input
            type="date"
            value={activity.date ?? ""}
            onChange={(e) => onChange({ date: e.target.value })}
            className="w-full px-3 py-2 rounded bg-neutral-800"
            style={{
              colorScheme: "dark",
            }}
          />
        </div>
        <div>
          <label className="block text-xs">Capacity</label>
          <input
            type="number"
            value={activity.capacity ?? ""}
            onChange={(e) =>
              onChange({
                capacity: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full px-3 py-2 rounded bg-neutral-800"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs">Times (start / end)</label>
        <div className="flex gap-2">
          <input
            type="time"
            value={activity.startTime ?? ""}
            onChange={(e) => onChange({ startTime: e.target.value })}
            className="w-1/2 px-3 py-2 rounded bg-neutral-800"
            style={{
              colorScheme: "dark",
            }}
          />
          <input
            type="time"
            value={activity.endTime ?? ""}
            onChange={(e) => onChange({ endTime: e.target.value })}
            className="w-1/2 px-3 py-2 rounded bg-neutral-800"
            style={{
              colorScheme: "dark",
            }}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs">Description</label>
        <textarea
          value={activity.description ?? ""}
          onChange={(e) => onChange({ description: e.target.value })}
          className="w-full p-2 rounded bg-neutral-800"
        />
      </div>

      <div>
        <label className="block text-xs">Location name</label>
        <input
          value={activity.location?.name ?? ""}
          onChange={(e) =>
            onChange({
              location: { ...(activity.location ?? {}), name: e.target.value },
            })
          }
          className="w-full px-3 py-2 rounded bg-neutral-800"
        />
        <label className="block text-xs mt-2">Location address</label>
        <input
          value={activity.location?.address ?? ""}
          onChange={(e) =>
            onChange({
              location: {
                ...(activity.location ?? {}),
                address: e.target.value,
              },
            })
          }
          className="w-full px-3 py-2 rounded bg-neutral-800"
        />
      </div>

      <div>
        <label className="block text-xs">Organizer name</label>
        <input
          value={activity.organizer?.name ?? ""}
          onChange={(e) =>
            onChange({
              organizer: {
                ...(activity.organizer ?? {}),
                name: e.target.value,
              },
            })
          }
          className="w-full px-3 py-2 rounded bg-neutral-800"
        />
        <label className="block text-xs mt-2">Organizer email</label>
        <input
          value={activity.organizer?.email ?? ""}
          onChange={(e) =>
            onChange({
              organizer: {
                ...(activity.organizer ?? {}),
                email: e.target.value,
              },
            })
          }
          className="w-full px-3 py-2 rounded bg-neutral-800"
        />
      </div>

      <div>
        <label className="block text-xs">Tags (comma separated)</label>
        <input
          value={(activity.tags ?? []).join(", ")}
          onChange={(e) =>
            onChange({
              tags: e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          className="w-full px-3 py-2 rounded bg-neutral-800"
        />
      </div>
      <div>
        <label className="block text-xs">Image (URL / Upload)</label>
        <div className="flex gap-4 py-2 items-center">
          <Checkbox
            id="image-url-checkbox"
            checked={imageUploadInput === "url"}
            onChange={(checked) =>
              setImageUploadInput(checked ? "url" : undefined)
            }
            label="Image URL"
          />
          <Checkbox
            id="image-upload-checkbox"
            checked={imageUploadInput === "upload"}
            onChange={(checked) =>
              setImageUploadInput(checked ? "upload" : undefined)
            }
            label="Upload Image"
          />
        </div>

        {imageUploadInput === "upload" && <div>test</div>}
        {imageUploadInput === "url" && (
          <input
            value={activity.img ?? ""}
            onChange={(e) =>
              onChange({
                img: e.target.value,
              })
            }
            className="w-full px-3 py-2 rounded bg-neutral-800"
          />
        )}
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          onClick={() =>
            navigator.clipboard?.writeText(JSON.stringify(activity, null, 2))
          }
          variant="ghost"
        >
          Copy JSON
        </Button>
      </div>
    </div>
  );
}
