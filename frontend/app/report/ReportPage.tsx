"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";
import { fetchReportData } from "../final_report/actions";
import { useEffect, useState } from "react";

const ReportPage: React.FC = () => {
  const params = useSearchParams();

  const [reportData, setReportData] = useState<Record<string, string> | null>(
    null
  );

  useEffect(() => {
    console.log("Fetching report data for vehicle:", params.get("vehicle"));
    fetchReportData(params.get("vehicle") || "", true).then((report) => {
      setReportData(report);
    });
  }, [params]);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="phone-container">
      <div className="phone-container-banner">
        <Image
          src="/company-name.png"
          alt="App Logo"
          width={100}
          height={100}
        />
      </div>
      <div className="phone-container-content">
        <h2>Claim Report Summary</h2>
        <p>
          <strong>Policy Number:</strong> {reportData.policyNumber}
        </p>
        <p>
          <strong>Name:</strong> {reportData.userName}
        </p>
        <p>
          <strong>Vehicle:</strong> {reportData.vehicle}
        </p>
        <p>
          <strong>Vehicle Type:</strong> {reportData.vehicleType}
        </p>
        <p>
          <strong>Photos Attached:</strong> {reportData.photosAttached}
        </p>
        <p>
          <Image
            src={reportData.photoUrl}
            alt="photo"
            width={100}
            height={100}
          ></Image>
        </p>
        <p>
          <strong>Damage Level:</strong>{" "}
          <input
            type="text"
            value={reportData.damageLevel}
            onChange={() => {
              /*TODO*/
            }}
          />
        </p>
        <p>
          <strong>Damage Description:</strong>
          <textarea
            value={reportData.damageDescription}
            onChange={() => {
              /*TODO*/
            }}
          />
        </p>
        <button>
          <Link href={`/chat?vehicle=${params.get("vehicle")}`}>
            Chat about your claim
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ReportPage;
