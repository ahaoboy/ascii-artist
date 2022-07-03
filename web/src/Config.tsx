import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import CopyIcon from "@mui/icons-material/CopyAll";
import UploadIcon from "@mui/icons-material/Upload";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { getImageData, updateImage } from "./share";
import Stack from "@mui/material/Stack";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdaptiveMethod, ThresholdType } from "adaptive-threshold-wasm";
import { useSnapshot } from "binia";
import { store } from "./store";
import copyText from "copy-text-to-clipboard";
// import Snackbar from "@mui/material/Snackbar";

const Input = styled("input")({
  display: "none",
});

const upload = async (e: any) => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  updateImage(url);
};
const download = () => {
  console.log("download");
  const filename = "ascii.txt";
  const blob = new Blob([store.ascii], {
    type: "text/plain:charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  setTimeout(() => {
    URL.revokeObjectURL(url);
  });
  a.click();
};

const copy = () => {
  copyText(store.ascii);
};
export default () => {
  const snap = useSnapshot(store);
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Stack direction="row" spacing={2}>
          <Typography className="label" gutterBottom>
            AdaptiveMethod
          </Typography>
          <Select
            className="slider"
            value={store.adaptiveMethod}
            onChange={(e: any) => (store.adaptiveMethod = +e.target.value)}
          >
            {Object.keys(AdaptiveMethod).map((k) => (
              <MenuItem
                key={k}
                value={AdaptiveMethod[k as keyof typeof AdaptiveMethod]}
              >
                {k}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography className="label" gutterBottom>
            ThresholdType
          </Typography>
          <Select
            className="slider"
            value={store.thresholdType}
            onChange={(e: any) => (store.thresholdType = +e.target.value)}
          >
            {Object.keys(ThresholdType).map((k) => (
              <MenuItem
                key={k}
                value={ThresholdType[k as keyof typeof ThresholdType]}
              >
                {k}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>

      {/* <Stack direction="row" spacing={2}>
        <Typography className="label" gutterBottom>
          MaxValue
        </Typography>
        <Slider
          className="slider"
          defaultValue={255}
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={255}
          value={snap.maxValue}
          onChange={(e: any) => {
            store.maxValue = +e.target!.value!;
          }}
        />
        <Typography className="label" gutterBottom>
          {snap.maxValue}
        </Typography>
      </Stack> */}
      <Stack direction="row" spacing={2}>
        <Typography className="label" gutterBottom>
          BlockSize
        </Typography>
        <Slider
          className="slider"
          defaultValue={7}
          valueLabelDisplay="auto"
          step={2}
          min={3}
          max={255}
          value={snap.blockSize}
          onChange={(e: any) => {
            store.blockSize = +e.target!.value!;
          }}
        />
        <Typography className="label" gutterBottom>
          {snap.blockSize}
        </Typography>{" "}
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography className="label" gutterBottom>
          C
        </Typography>
        <Slider
          className="slider"
          defaultValue={3}
          valueLabelDisplay="auto"
          step={1}
          min={-125}
          value={snap.C}
          max={255}
          onChange={(e: any) => {
            store.C = +e.target!.value!;
          }}
        />
        <Typography className="label" gutterBottom>
          {snap.C}
        </Typography>{" "}
      </Stack>

      <div className="btn-list">
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={upload}
          />
          <Button
            size="small"
            variant="contained"
            component="span"
            startIcon={<UploadIcon />}
          >
            Upload
          </Button>
        </label>
        <Button
          onClick={download}
          size="small"
          variant="contained"
          startIcon={<DownloadIcon />}
        >
          Download
        </Button>
        <Button
          onClick={copy}
          size="small"
          variant="contained"
          startIcon={<CopyIcon />}
        >
          Copy
        </Button>
      </div>
    </>
  );
};
