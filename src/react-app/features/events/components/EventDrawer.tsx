// src/react-app/features/events/components/EventDrawer.tsx
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Paper
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { removeEvent } from "@/features/events/eventSlice";
import { LunarDate } from "@/core/lunarEngine/solarToLunar";

interface EventDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpenDialog: () => void; // Trigger to open the Add Event modal
  selectedLunar: LunarDate | null;
  selectedSolarDay: number | null;
  month: number;
  year: number;
}

export const EventDrawer = ({ 
  open, 
  onClose, 
  onOpenDialog, 
  selectedLunar, 
  selectedSolarDay, 
  month, 
  year 
}: EventDrawerProps) => {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.events);

  // Filter events dynamically based on the selected lunar date
  const dayEvents = selectedLunar ? events.filter(e => 
    e.lunarDay === selectedLunar.day && 
    e.lunarMonth === selectedLunar.month && 
    (e.repeatYearly || e.lunarYear === selectedLunar.year)
  ) : [];

  if (!selectedLunar) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: 300, sm: 400 }, p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
        
        {/* Header section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">Chi Tiết Ngày</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Date Display Card */}
        <Paper elevation={0} sx={{ p: 2, bgcolor: "#f8f9fa", border: "1px solid #e0e0e0", mb: 3 }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Dương lịch: {selectedSolarDay} tháng {month}, {year}
          </Typography>
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            Âm lịch: {selectedLunar.day}/{selectedLunar.month}/{selectedLunar.year}
            {selectedLunar.isLeap ? " (Nhuận)" : ""}
          </Typography>
        </Paper>

        <Divider sx={{ mb: 2 }} />

        {/* Event List */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Sự kiện ({dayEvents.length})
          </Typography>
          
          {dayEvents.length === 0 ? (
            <Typography variant="body2" color="text.secondary" fontStyle="italic">
              Không có sự kiện nào trong ngày này.
            </Typography>
          ) : (
            <List disablePadding>
              {dayEvents.map((event) => (
                <ListItem 
                  key={event.id} 
                  disablePadding 
                  sx={{ mb: 2, borderLeft: "4px solid #f57c00", pl: 1.5 }}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => dispatch(removeEvent(event.id))}>
                      <DeleteIcon color="error" fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemText 
                    primary={
                      <Typography variant="body1" fontWeight="medium">
                        {event.title}
                      </Typography>
                    } 
                    secondary={
                      <>
                        {event.description && <Typography variant="body2" color="text.secondary">{event.description}</Typography>}
                        <Typography variant="caption" color="primary">
                          {event.repeatYearly ? "↻ Lặp lại hàng năm" : "Sự kiện một lần"}
                        </Typography>
                      </>
                    } 
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* Add Event Button at the bottom */}
        <Box pt={2} mt="auto">
          <Button 
            variant="contained" 
            fullWidth 
            startIcon={<AddIcon />}
            onClick={onOpenDialog}
          >
            Thêm Sự Kiện Mới
          </Button>
        </Box>

      </Box>
    </Drawer>
  );
};