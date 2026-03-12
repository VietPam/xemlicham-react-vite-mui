import { useState } from "react";
import { Box, Paper, Grid } from "@mui/material";
import dayjs from "dayjs";
import { useAppSelector } from "@/app/hooks";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarCell } from "./CalendarCell";
import { MiniMonth } from "./MiniMonth"; // <-- Import MiniMonth
import { EventDialog } from "@/features/events/components/EventDialog";
import { EventDrawer } from "@/features/events/components/EventDrawer";
import { convertSolarToLunar, LunarDate } from "@/core/lunarEngine/solarToLunar";

const DAYS_OF_WEEK = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export const CalendarTable = () => {
  const { month, year, viewMode } = useAppSelector((state) => state.calendar); // <-- Pull viewMode
  const { events } = useAppSelector((state) => state.events);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSolarDay, setSelectedSolarDay] = useState<number | null>(null);
  const [selectedLunar, setSelectedLunar] = useState<LunarDate | null>(null);

  const handleCellClick = (day: number, lunarDate: LunarDate | null) => {
    if (day && lunarDate) {
      setSelectedSolarDay(day);
      setSelectedLunar(lunarDate);
      setDrawerOpen(true);
    }
  };

  // --- Logic for Month View ---
  const startOfMonth = dayjs(`${year}-${month}-01`);
  const daysArray: (number | null)[] = Array(startOfMonth.day()).fill(null);
  for (let i = 1; i <= startOfMonth.daysInMonth(); i++) {
    daysArray.push(i);
  }
  const today = dayjs();
  // ----------------------------

  return (
    <>
      <Paper elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2, overflow: 'hidden', maxWidth: 1000, margin: "0 auto", mt: 4, p: 2 }}>
        <CalendarHeader />
        
        {/* CONDITIONAL RENDER: YEAR VIEW */}
        {viewMode === "year" && (
          <Grid container spacing={2} mt={1}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={m}>
                <MiniMonth targetMonth={m} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* CONDITIONAL RENDER: MONTH VIEW */}
        {viewMode === "month" && (
          <Box mt={2} sx={{ border: "1px solid #e0e0e0", borderRadius: 1, overflow: "hidden" }}>
            <Grid container>
              {DAYS_OF_WEEK.map((day, index) => (
                <Grid size={12 / 7} key={day}>
                  <Box textAlign="center" fontWeight="bold" py={1.5} bgcolor="#f8f9fa" color={index === 0 ? "primary.main" : "text.secondary"} borderBottom="1px solid #e0e0e0">
                    {day}
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Grid container>
              {daysArray.map((day, index) => {
                const isToday = day === today.date() && month === today.month() + 1 && year === today.year();
                const lunarDate = day ? convertSolarToLunar(day, month, year) : null;
                const dayEvents = lunarDate ? events.filter(e => 
                  e.lunarDay === lunarDate.day && e.lunarMonth === lunarDate.month && (e.repeatYearly || e.lunarYear === lunarDate.year)
                ) : [];

                return (
                  <Grid size={12 / 7} key={index}>
                    <CalendarCell day={day} lunarDate={lunarDate} isToday={isToday} dayEvents={dayEvents} onClick={() => day ? handleCellClick(day, lunarDate) : undefined} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Paper>

      <EventDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onOpenDialog={() => setDialogOpen(true)} selectedLunar={selectedLunar} selectedSolarDay={selectedSolarDay} month={month} year={year} />
      <EventDialog open={dialogOpen} onClose={() => setDialogOpen(false)} selectedLunar={selectedLunar} selectedSolarDay={selectedSolarDay} month={month} year={year} />
    </>
  );
};