import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import buyBlue from "../../assets/icons/buy-blue.svg";
import coin from "../../assets/icons/coin.svg";
import { redeemProduct } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";
import swal from "sweetalert";

const ProductCard = ({ data, userCoins }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [canBuy, setCanBuy] = React.useState({ isAbleToBuy: true, need: 0 });

  const handleRedeem = () => {
    if(userCoins > data.cost) {
      swal("Are you sure you want to redeem this product?", {
        buttons: {
          cancel: "No",
          accept: "Yes",
        },
      })
      .then((value) => {
        switch(value) {
          case "accept":
            swal('The product is now yours!', "", "success")
            dispatch(redeemProduct(data._id, data.cost));
            break;
          case 'cancel':
            break
          default:  break;
        }
      })
    } else {
      alert('You cant buy this!')
    }
  };

  React.useEffect(() => {
    if (parseInt(data.cost) > userCoins) {
      setCanBuy({ isAbleToBuy: false, need: data.cost - userCoins });
    } else {
      setCanBuy({ isAbleToBuy: true, need: data.cost - userCoins });
    }
  }, [data, userCoins]);

  return (
    <Card className={`${classes.root}`} key={data._id}>
      <div className={classes.imageContainer}>
        <img
          className={classes.cardMedia}
          alt={data.name}
          src={data.img.url}
          title={data.name}
        />
        <Divider variant="middle" />
        <div>
          {canBuy.isAbleToBuy && (
            <Button
              className={classes.buyButtonBlue}
              size="small"
              color="primary"
            >
              <img src={buyBlue} alt="buy" width="50%" />
            </Button>
          )}
          {!canBuy.isAbleToBuy && (
            <Button
              className={`${classes.buyButtonBlue} ${classes.disableBuyButton}`}
            >
              <p>You need {canBuy.need}</p>{" "}
              <img
                src={coin}
                width={20}
                alt="coin"
                style={{ marginLeft: ".2rem" }}
              />
            </Button>
          )}
        </div>
        <div className={classes.overlay}>
          <div className={classes.overlayContent}>
            <div className={classes.coinsRedeem}>
              <p>{data.cost}</p>
              <img src={coin} alt="coin" style={{ marginLeft: ".5rem" }} />
            </div>
            {canBuy.isAbleToBuy && (
              <Button
                variant="outlined"
                className={classes.redeemButton}
                onClick={(handleRedeem)}
              >
                Redeem now
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.cardContent}>
          {data.category}
        </Typography>
        <Typography gutterBottom variant="body1" component="p" className={classes.cardContent}>
          {data.name}
        </Typography>
      </CardContent>
    </Card>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    maxHeight: 300,
    position: "relative",
    [theme.breakpoints.down('sm')]: {
      width: "85%",
      height: "85%"
    }
  },
  cardMedia: {
    padding: "0",
    width: "70%",
    margin: '1rem',
  },
  imageContainer: {
    textAlign: "center",
    "&:hover": {
      opacity: 1,
    },
  },
  buyButtonBlue: {
    position: "absolute",
    top: "5%",
    right: 0,
    margin: 0,
    padding: 0,
    borderRadius: "1rem",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: "100%",
    width: "100%",
    opacity: 0,
    transition: ".5s ease",
    background: "rgba(10, 212, 250, 0.6)",
    "&:hover": {
      opacity: 1,
    },
  },
  overlayContent: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    color: "#fff",
    fontSize: "24px",
    
  },
  redeemButton: {
    background: "white",
    borderRadius: "1rem",
    fontFamily: "SourceSansPro-Regular",
    fontSize: "14px",
    color: "#616161",
    letterSpacing: "-0.04px",
    textAlign: "center",
    marginTop: "1rem",
    "&:hover": {
      background: "white",
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '13px',
      color: 'black'
    }
  },
  coinsRedeem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  disableBuyButton: {
    opacity: "0.8",
    background: "#616161",
    borderRadius: "100px",
    padding: "1rem",
    width: "150px",
    height: "25px",
    fontSize: "10px",
    color: "#fff",
  },
  cardContent: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '13px',
      paddingBottom: '.5rem',
    }
  }
}));
export default ProductCard;
