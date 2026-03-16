import React from "react";
import { Card } from "@mantine/core";
import "../paymentCard.css";
import CardChip from "./CardChip";

interface Props {
  method: {
    id: string;
    name: string;
  };
  selected?: boolean;
  onSelect?: (id: string) => void;
}

const RealStylePaymentCard: React.FC<Props> = ({ method, onSelect }) => {
  const isStripe = method.id === "stripe";
  const isAuthorize = method.id === "authorize_net";
  const isBrainTree = method.id === "brain_tree";

  return (
    <Card
      className={`payment-card ${isStripe ? "stripe-card" : ""} ${
        isAuthorize ? "authorize-card" : ""
      } ${isBrainTree ? "braintree-card" : ""}`}
      onClick={() => onSelect?.(method.id)}
      padding={0}
      radius="lg"
    >

      {isStripe && (
        <>
          <div className="stripe-top" />
          <div className="stripe-logo">stripe</div>
        </>
      )}

      {isAuthorize && (
        <>
          <div className="auth-big-circle" />
          <div className="auth-small-circle" />

          <img
            className="authorize-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Authorize.Net%2C_A_Visa_Solution_wordmark.svg"
          />
        </>
      )}

      {isBrainTree && (
        <>
          <div className="braintree-color-bar bar-1" />
          <div className="braintree-color-bar bar-2" />
          <div className="braintree-color-bar bar-3" />
          <div className="braintree-color-bar bar-4" />
          
          <div className="braintree-table">
            <table>
              <tr>
                <td>Category</td>
                <td>Value (%)</td>
              </tr>
              {[...Array(125)].map((_, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>100</td>
                </tr>
              ))}
            </table>
          </div>
           <img 
            className="braintree-logo-image"
            src="https://newsroom.ie.paypal-corp.com/image/braintree-logo_tn.png"
            alt="Brain Tree"
          />
          <div className="card-number-full">**** **** **** 1234</div>
          <div className="cardholder-name">Lee M. Cardholder</div>
        </>
      )}

      <div className="chip">
        <CardChip />
      </div>

      {isAuthorize && (
        <div className="card-number">
          **** **** **** 1234
        </div>
      )}

      {isStripe && (
        <div className="card-bottom">
          <div className="card-name">Jane D. Rocket</div>

          <div className="brand">
            <span className="brand-icon">➤ </span>
            ROCKET RIDES
          </div>
        </div>
      )}

      {isAuthorize && (
        <div className="card-bottom">
          <div className="card-name">John Smith</div>
          <div className="card-exp">08 / 28</div>
        </div>
      )}
    </Card>
  );
};

export default RealStylePaymentCard;