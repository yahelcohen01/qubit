"use client";
import React, { useEffect, useState } from "react";

type Activity = {
  id: string;
  title: string;
  date?: string;
  description?: string;
};

export default function AdminEditorClient() {
  const [jsonText, setJsonText] = useState<string>("[]");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void fetchActivities();
  }, []);

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
      setJsonText(JSON.stringify(data.activities ?? [], null, 2));
    } catch (err: any) {
      setMessage(String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    let parsed: Activity[];
    try {
      parsed = JSON.parse(jsonText) as Activity[];
      if (!Array.isArray(parsed))
        throw new Error("Expected an array of activities");
    } catch (err: any) {
      setMessage("Invalid JSON: " + (err?.message ?? String(err)));
      setSaving(false);
      return;
    }

    try {
      const resp = await fetch("/api/admin/update-activities", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activities: parsed }),
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

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <button
          onClick={() => void fetchActivities()}
          disabled={loading || saving}
          style={{ marginRight: 8 }}
        >
          Reload
        </button>
        <button onClick={() => void handleSave()} disabled={loading || saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && (
        <div style={{ marginBottom: 12, color: "#b22" }}>{message}</div>
      )}

      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        spellCheck={false}
        style={{
          width: "100%",
          height: 420,
          fontFamily: "monospace",
          fontSize: 13,
          padding: 12,
        }}
      />

      <div style={{ marginTop: 12, color: "#666", fontSize: 13 }}>
        <strong>Tip:</strong> keep valid JSON and ensure each activity has a
        unique `id`.
      </div>
    </>
  );
}
