// src/react-app/features/events/components/EventDialog.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography
} from "@mui/material";
import { useAppDispatch } from "@/app/hooks";
import { addEvent } from "@/features/events/eventSlice";
import { LunarDate } from "@/core/lunarEngine/solarToLunar";

interface EventDialogProps {
  open: boolean;
  onClose: () => void;
  selectedLunar: LunarDate | null;
  selectedSolarDay: number | null;
  month: number;
  year: number;
}

export const EventDialog = ({ open, onClose, selectedLunar, selectedSolarDay, month, year }: EventDialogProps) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [repeatYearly, setRepeatYearly] = useState(true);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
      setRepeatYearly(true);
    }
  }, [open]);

  const handleSave = () => {
    if (!title.trim() || !selectedLunar) return;

    dispatch(
      addEvent({
        id: Date.now().toString(), // Simple unique ID generator
        title: title.trim(),
        description: description.trim(),
        lunarDay: selectedLunar.day,
        lunarMonth: selectedLunar.month,
        lunarYear: selectedLunar.year,
        isLeapMonth: selectedLunar.isLeap,
        repeatYearly,
      })
    );
    onClose();
  };

  if (!selectedLunar) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight="bold">Thêm Sự Kiện Âm Lịch</DialogTitle>
      <DialogContent dividers>
        <Box mb={2} p={1.5} bgcolor="#f8f9fa" borderRadius={1} border="1px solid #e0e0e0">
          <Typography variant="body2" color="text.secondary">
            Dương lịch: {selectedSolarDay}/{month}/{year}
          </Typography>
          <Typography variant="body1" fontWeight="bold" color="primary.main">
            Âm lịch: Ngày {selectedLunar.day} Tháng {selectedLunar.month} Năm {selectedLunar.year} 
            {selectedLunar.isLeap ? " (Tháng Nhuận)" : ""}
          </Typography>
        </Box>

        <TextField
          autoFocus
          margin="dense"
          label="Tên sự kiện (VD: Giỗ ông nội, Sinh nhật)"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <TextField
          margin="dense"
          label="Ghi chú (Tùy chọn)"
          type="text"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={repeatYearly}
              onChange={(e) => setRepeatYearly(e.target.checked)}
              color="primary"
            />
          }
          label="Lặp lại hàng năm (Theo Âm Lịch)"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Hủy</Button>
        <Button onClick={handleSave} variant="contained" color="primary" disabled={!title.trim()}>
          Lưu Sự Kiện
        </Button>
      </DialogActions>
    </Dialog>
  );
};