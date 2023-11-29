import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";

export default function Cards({ colors, btn, price, duration }) {
  const navigate = useNavigate();
  return (
    <div>
      <Card size="lg" variant="soft">
        <Chip size="sm" variant="soft" sx={{ color: `${colors}` }}>
          {btn}
        </Chip>
        <Typography sx={{ fontFamily: `"Inconsolata", monospace` }} level="h2">
          Professional
        </Typography>
        <Divider inset="none" />
        <List size="sm" sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Exclusive Content
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Extended Interviews
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Detailed Reports
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Exclusive Events
          </ListItem>
        </List>
        <Divider inset="none" />
        <CardActions>
          <Typography
            sx={{ fontFamily: `"Inconsolata", monospace`, mr: "auto" }}
            level="title-lg"
          >
            ${price}
            <Typography
              sx={{ fontFamily: `"Inconsolata", monospace` }}
              fontSize="sm"
              textColor="text.tertiary"
            >
              /{duration}
            </Typography>
          </Typography>
          <Button
            onClick={() => {
              navigate("/subscriptions");
            }}
            variant="soft"
            sx={{
              borderBottom: "#58bfff solid",
              borderRadius: 0,
              "&:hover": {
                backgroundImage:
                  "linear-gradient(to top right, #58bfff , #01bea5)",
                color: "white",
              },
            }}
            endDecorator={<KeyboardArrowRight />}
          >
            Start now
          </Button>
        </CardActions>
      </Card>
      {/* <Button
        size="sm"
        variant="text"
        colors="white"
        className=" border-b-2 hover:bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] mx-auto border-[#58bfff] hover:border-none text-black rounded-none  hover:text-white delay-100 ease-linear duration-200"
      >
        Get it Now
      </Button> */}
    </div>
  );
}
