"use client";
import React, { useEffect, useMemo, useState } from "react";
import { isEqual } from "lodash";
import { cn } from "@shared/lib";
import { ConditionalWrapper } from "../components/conditional-wrapper";
import { Tooltip } from "../components/tooltip";
import { DeleteIcon, DuplicateIcon } from "@shared/icons";
import { Activity } from "@shared/types";

export default function AdminEditorClient() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [rawMode, setRawMode] = useState(false);
  const [rawText, setRawText] = useState("[]");
  const [filter, setFilter] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [originalActivities, setOriginalActivities] = useState<Activity[]>([]);

  const selectedActivity = useMemo(() => {
    return activities.find((a) => a.id === selectedId) ?? null;
  }, [activities, selectedId]);

  useEffect(() => {
    void fetchActivities();
  }, []);

  useEffect(() => {
    // Keep rawText in sync when activities change (unless user is actively editing raw)
    if (!rawMode) setRawText(JSON.stringify(activities, null, 2));
  }, [activities, rawMode]);

  async function fetchActivities() {
    setLoading(true);
    setMessage(null);
    try {
      const resp = await fetch("/api/admin/get-activities", {
        method: "GET",
        credentials: "same-origin",
        headers: { Accept: "application/json" },
      });
      if (!resp.ok) {
        const txt = await resp.text();
        setMessage(`Failed to load activities: ${resp.status} ${txt}`);
        return;
      }
      const data = await resp.json();
      const arr = (data.activities ?? data ?? []) as Activity[];
      setActivities(arr);
      setRawText(JSON.stringify(arr, null, 2));
      setOriginalActivities(arr);
    } catch (err: any) {
      setMessage(String(err));
    } finally {
      setLoading(false);
    }
  }

  function validateUniqueIds(arr: Activity[]) {
    const seen = new Map<string, number>();
    for (let i = 0; i < arr.length; i++) {
      const id = String(arr[i]?.id ?? "").trim();
      if (!id) return { ok: false, reason: `Empty id at index ${i}` };
      seen.set(id, (seen.get(id) ?? 0) + 1);
      if (seen.get(id)! > 1)
        return { ok: false, reason: `Duplicate id '${id}'` };
    }
    return { ok: true };
  }

  function validateActivity(a: Activity) {
    if (!a.id || !a.title) return false;
    return true;
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    // Validate
    const vu = validateUniqueIds(activities);
    if (!vu.ok) {
      setMessage("Validation error: " + vu.reason);
      setSaving(false);
      return;
    }
    for (const a of activities) {
      if (!validateActivity(a)) {
        setMessage(
          `Validation error: activity ${
            a.id ?? "(missing id)"
          } missing required fields`
        );
        setSaving(false);
        return;
      }
    }

    try {
      const resp = await fetch("/api/admin/update-activities", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activities }),
      });
      if (!resp.ok) {
        const txt = await resp.text();
        setMessage(`Failed to save: ${resp.status} ${txt}`);
        return;
      }
      const body = await resp.json();
      setMessage(`Saved — commit ${body?.commit?.sha ?? "(unknown)"}`);
    } catch (err: any) {
      setMessage(String(err));
    } finally {
      setSaving(false);
    }
  }

  function newId() {
    return (globalThis.crypto as any)?.randomUUID?.() ?? `id-${Date.now()}`;
  }

  function addActivity() {
    const a: Activity = {
      id: newId(),
      title: "New activity",
      date: undefined,
      description: "",
      tags: [],
      location: { name: "", address: "" },
      organizer: { name: "", email: "" },
    };
    setActivities((s) => [a, ...s]);
    setSelectedId(a.id);
  }

  function removeActivity(id: string) {
    if (!confirm("Delete activity " + id + "?")) return;
    setActivities((s) => s.filter((x) => x.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function updateActivity(id: string, patch: Partial<Activity>) {
    setActivities((s) => s.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }

  function duplicateActivity(id: string) {
    const orig = activities.find((a) => a.id === id);
    if (!orig) return;
    const copy = { ...orig, id: newId(), title: `${orig.title} (copy)` };
    setActivities((s) => [copy, ...s]);
    setSelectedId(copy.id);
  }

  function applyRawText() {
    try {
      const parsed = JSON.parse(rawText) as Activity[];
      if (!Array.isArray(parsed))
        throw new Error("Expected an array at top-level");
      const vu = validateUniqueIds(parsed);
      if (!vu.ok) {
        setMessage("Validation error: " + vu.reason);
        return;
      }
      setActivities(parsed);
      setMessage("Imported JSON into structured editor");
    } catch (err: any) {
      setMessage("Invalid JSON: " + (err?.message ?? String(err)));
    }
  }

  const filtered = useMemo(() => {
    if (!filter.trim()) return activities;
    const q = filter.toLowerCase();
    return activities.filter(
      (a) =>
        a.id.toLowerCase().includes(q) ||
        (a.title ?? "").toLowerCase().includes(q) ||
        (a.description ?? "").toLowerCase().includes(q) ||
        (a.tags ?? []).some((t) => t.toLowerCase().includes(q))
    );
  }, [activities, filter]);

  const hasChanged = useMemo(() => {
    return !isEqual(originalActivities, activities);
  }, [activities, originalActivities]);

  return (
    <div className="p-6 max-w-full">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Activities — Admin Editor</h1>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => fetchActivities()}
            disabled={loading || saving}
            variant="ghost"
          >
            {loading ? "Loading..." : "Reload"}
          </Button>
          <Button
            onClick={() => void handleSave()}
            disabled={loading || saving || !hasChanged}
            variant="success"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </header>

      <div className="flex gap-6">
        <aside className="w-1/3">
          <div className="grid grid-cols-4 mb-4 gap-2">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search by id/title/tag"
              className="w-full px-3 border border-neutral-800 rounded m-0 col-span-3"
            />
            <Button onClick={() => addActivity()} variant="success">
              + New
            </Button>
          </div>

          <div className="space-y-2 max-h-[60vh] overflow-auto">
            {filtered.map((a) => (
              <div
                key={a.id}
                onClick={() => setSelectedId(a.id)}
                className={cn(
                  `p-2 rounded cursor-pointer flex items-center justify-between border border-black`,
                  selectedId === a.id ? "border border-neutral-800" : "bg-black"
                )}
              >
                <div>
                  <div className="text-sm font-medium line-clamp-1">
                    {a.title}
                  </div>
                  <div className="text-xs text-gray-500">{a.id}</div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateActivity(a.id);
                    }}
                    className="text-xs p-1"
                    variant="ghost"
                    tooltip="Duplicate"
                  >
                    <DuplicateIcon className="size-4" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeActivity(a.id);
                    }}
                    variant="danger"
                    className="text-xs p-1 text-red-500 bg-transparent hover:bg-neutral-800 border border-neutral-800"
                    tooltip="Delete"
                  >
                    <DeleteIcon className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-sm text-gray-500">
                No activities match your filter
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  setRawText(JSON.stringify(activities, null, 2));
                  setMessage("Prepared raw JSON");
                  setRawMode(!rawMode);
                }}
                variant={rawMode ? "filled" : "ghost"}
              >
                Edit raw JSON
              </Button>

              <Button
                onClick={() => {
                  setActivities(
                    JSON.parse(JSON.stringify(activities))
                      .slice()
                      .sort((a: any, b: any) =>
                        (a.date || "").localeCompare(b.date || "")
                      )
                  );
                  setMessage("Sorted by date");
                }}
                variant="ghost"
              >
                Sort by date
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              {activities.length} activities
            </div>
          </div>

          {message && (
            <div className="mb-4 text-sm text-red-600">{message}</div>
          )}

          {rawMode ? (
            <div>
              <div className="mb-2 flex gap-2">
                <Button
                  onClick={() => applyRawText()}
                  variant="ghost"
                  className="bg-blue-700 hover:bg-blue-600"
                >
                  Apply JSON
                </Button>
                <Button
                  onClick={() => {
                    setRawText(JSON.stringify(activities, null, 2));
                    setMessage("Reverted raw to structured state");
                  }}
                  variant="ghost"
                >
                  Revert
                </Button>
              </div>
              <textarea
                spellCheck={false}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full h-[60vh] font-mono p-4 border rounded"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <section className="col-span-1">
                <h2 className="text-lg font-medium mb-3">Editor</h2>
                {selectedId ? (
                  <ActivityForm
                    key={selectedId}
                    activity={selectedActivity}
                    onChange={(patch) => updateActivity(selectedId, patch)}
                  />
                ) : (
                  <div className="text-sm text-gray-500">
                    Select an activity to edit or create a new one.
                  </div>
                )}
              </section>

              <section className="col-span-1">
                <h2 className="text-lg font-medium mb-3">
                  Preview & Quick Actions
                </h2>
                {selectedId ? (
                  <ActivityPreview
                    activity={activities.find((a) => a.id === selectedId)!}
                  />
                ) : (
                  <div className="text-sm text-gray-500">
                    Preview shows selected activity.
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Bulk actions</h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setRawText(JSON.stringify(activities, null, 2));
                        setRawMode(true);
                        setMessage(null);
                      }}
                      variant="ghost"
                    >
                      Export JSON
                    </Button>
                    <label className="px-3 py-1 rounded cursor-pointer transition-colors border border-neutral-800 hover:bg-neutral-800">
                      <input
                        type="file"
                        accept="application/json"
                        className="hidden"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          try {
                            const txt = await f.text();
                            const parsed = JSON.parse(txt);
                            if (!Array.isArray(parsed))
                              throw new Error("Expected array");
                            const vu = validateUniqueIds(parsed);
                            if (!vu.ok) {
                              setMessage("Import error: " + vu.reason);
                              return;
                            }
                            setActivities(parsed);
                            setMessage("Imported file into structured editor");
                          } catch (err: any) {
                            setMessage(
                              "Import failed: " + (err?.message ?? String(err))
                            );
                          }
                        }}
                      />
                      Import file
                    </label>
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ActivityForm({
  activity,
  onChange,
}: {
  activity: Activity | null;
  onChange: (p: Partial<Activity>) => void;
}) {
  console.log("Rendering form for", activity);

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

function ActivityPreview({ activity }: { activity: Activity }) {
  return (
    <div className="p-4 border rounded">
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 flex items-center justify-center text-xs rounded overflow-hidden">
          {activity.imageUrl ? (
            <img
              src={activity.imageUrl}
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

function Button({
  children,
  onClick,
  className,
  variant,
  disabled,
  tooltip,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  variant: "filled" | "ghost" | "danger" | "success";
  disabled?: boolean;
  tooltip?: string;
}) {
  const baseClasses = cn(
    `px-3 py-1 rounded cursor-pointer transition-colors`,
    disabled ? "opacity-50 cursor-not-allowed" : ""
  );
  const variantClasses =
    variant === "filled"
      ? "bg-neutral-800 hover:bg-neutral-700"
      : variant === "ghost"
      ? "border border-neutral-800 hover:bg-neutral-800"
      : variant === "danger"
      ? "bg-red-700 hover:bg-red-600"
      : variant === "success"
      ? "bg-green-700 text-white hover:bg-green-800"
      : "";

  return (
    <ConditionalWrapper
      condition={!!tooltip}
      wrapper={(children) => (
        <Tooltip content={tooltip} position="top" showDelay={800}>
          {children}
        </Tooltip>
      )}
    >
      <button
        onClick={onClick}
        className={cn(baseClasses, variantClasses, className)}
      >
        {children}
      </button>
    </ConditionalWrapper>
  );
}
